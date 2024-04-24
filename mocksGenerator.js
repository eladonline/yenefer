const mongoose = require("mongoose");
const ProductConfig = require("./src/app/(pages)/(home)/my-products/lib/config.json");
const dayjs = require("dayjs");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const accessControl = require("./src/app/configs/accessControl.ts");

const SALT = 10;

const [node, path, count] = process.argv;

const createProducts = (count) => {
  let counter = 0;
  let categoriesCounter = 0;
  const mocks = [];

  while (counter < Number(count)) {
    counter++;
    categoriesCounter === ProductConfig.categories.length - 1
      ? (categoriesCounter = 0)
      : categoriesCounter++;

    mocks.push({
      name: `Product ${counter}`,
      category: ProductConfig.categories[categoriesCounter].toLowerCase(),
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tincidunt metus vel metus imperdiet molestie. Proin ac lacinia neque. Maecenas ut mauris est. Curabitur quis orci porta, placerat justo vel, rhoncus est. Pellentesque maximus, leo vel vestibulum blandit, massa arcu pharetra lectus, sit amet sollicitudin purus orci quis ante. Integer faucibus ac mauris at hendrerit. Phasellus sed lacus nec risus aliquet hendrerit. Maecenas ut risus id sapien tincidunt ultrices vitae ac dui.",
      price: counter + 5,
      created: new Date(dayjs().subtract(counter, "minutes").toString()),
      terms: {
        min_price: 2,
        discount_each_buyer: {
          value: 1,
          unit: "nis",
          _id: { $oid: new mongoose.Types.ObjectId() },
        },
        end_date: dayjs().add(counter, "minutes"),
        quantity: Number(count + 5),
      },
      _id: { $oid: new mongoose.Types.ObjectId() },
    });
  }

  return mocks;
};

const createUsers = async (count) => {
  let counter = 0;
  let licenseCounter = 0;
  const users = [];
  const userData = {};

  while (counter < Number(count)) {
    counter++;
    licenseCounter === accessControl.licenseTypes.length - 1
      ? (licenseCounter = 0)
      : licenseCounter++;
    const salt = bcrypt.genSaltSync(SALT);
    const hash = await bcrypt.hash("e", salt);
    const userId = new mongoose.Types.ObjectId();
    const license = accessControl.licenseTypes[licenseCounter];
    const email = `${license}@e.com`;

    if (license === "seller") userData.products = createProducts(20);

    users.push({
      _id: { $oid: userId },
      license: license,
      password: hash,
      email: email,
      configurations: {
        settings: {
          user: { username: email },
        },
      },
      data: userData,
    });
  }

  return { users };
};

createUsers(Number(count)).then((collections) => {
  const dir = "./database";

  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const entries = Object.entries(collections);

  for (let [key, value] of entries) {
    const content = JSON.stringify(value, null, 2);
    fs.writeFile(`./database/${key}.json`, content, (err) => {
      if (err) {
        console.error(`Error creating ${key} file:`, err);
      } else {
        console.log(`File ${key} created successfully!`);
      }
    });
  }
});
