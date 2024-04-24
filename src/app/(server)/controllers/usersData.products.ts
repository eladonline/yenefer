import { NextRequest, NextResponse } from "next/server";
import errorHandler from "@/app/(server)/handlers/errorHandler";
import { ProductType } from "@/types/apis/usersData";
import cloudinaryService from "@/app/(server)/services/cloudinary";
import { clientTokenProps } from "@/app/(server)/services/Jwt";
import tokenHandler from "@/app/(server)/handlers/tokenHandler";
import { JwtPayload } from "jsonwebtoken";
import User, { UserType } from "@/app/(server)/models/User";
import _set from "lodash/set";
import products from "@/app/(pages)/(home)/my-products/lib/Products";

type UserDataProductsType = NextRequest & {
  tokenPayload?: JwtPayload & clientTokenProps;
  body: {
    name: string;
    category: string;
    description: string;
    price: number;
    terms: {
      min_price: number;
      discount_each_buyer: { value: number; unit: string };
      end_date: any;
      quantity: number;
    };
    images: Buffer[];
  };
};

export const createProductController = async (
  request: UserDataProductsType,
) => {
  const id = request.headers.get("id");
  const usr = request?.tokenPayload?.usr;

  const { name, category, description, price, terms, images } =
    await request.json();
  const product: ProductType = {
    name,
    category,
    description,
    price,
    terms,
  };
  const user: UserType | null = await User.findById(id);

  if (!user) throw new Error("");

  if (images) {
    const dbImages = [];

    for (let image of images) {
      try {
        const uploadData = await cloudinaryService.api.upload(image.base64, {
          folder: usr,
          unique_filename: true,
        });
        const { signature, public_id, secure_url, url, folder } = uploadData;
        dbImages.push({
          meta: { signature, public_id, folder },
          src: { url, secure_url },
        });
      } catch (err) {
        console.trace(err);
      }
    }

    if (dbImages.length) product.images = dbImages;
  }

  if (!user?.data?.products) _set(user, "data.products", [product]);
  else user.data.products.push(product);

  await User.findByIdAndUpdate(id, user);

  return NextResponse.json(
    { message: "Product created successfully" },
    { status: 200 },
  );
};

export const patchProductController = async (
  request: UserDataProductsType,
  { params }: { params: { productId: string } },
) => {
  const id = request.headers.get("id");
  const usr = request?.tokenPayload?.usr;

  const { name, category, description, price, terms, images } =
    await request.json();

  // if (images) {
  //   const dbImages = [];
  //
  //   for (let image of images) {
  //     try {
  //       const uploadData = await cloudinaryService.api.upload(image.base64, {
  //         folder: usr,
  //         unique_filename: true,
  //       });
  //       const { signature, public_id, secure_url, url, folder } = uploadData;
  //       dbImages.push({
  //         meta: { signature, public_id, folder },
  //         src: { url, secure_url },
  //       });
  //     } catch (err) {
  //       console.trace(err);
  //     }
  //   }
  //
  //   if (dbImages.length) product.images = dbImages;
  // }

  await User.findOneAndUpdate(
    {
      _id: id,
      "products._id": params.productId,
    },
    {
      $set: {
        "products.$.name": name,
        "products.$.category": category,
        "products.$.description": description,
        "products.$.price": price,
        "products.$.terms": terms,
      },
    },
  );
  return NextResponse.json(
    { message: "Product updated successfully" },
    { status: 200 },
  );
};

export const deleteProductController = async (
  request: UserDataProductsType,
  { params }: { params: { productId: string } },
) => {
  const id = request.headers.get("id");
  await User.findOneAndUpdate(
    {
      users_id: id,
      "products._id": params.productId,
    },
    {
      $pull: { products: { _id: params.productId } },
    },
  );

  return NextResponse.json(
    { message: "Product Deleted successfully" },
    { status: 200 },
  );
};

export const getProductController = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const id = request.headers.get("id");
  const filters: { [key: string]: any } = { _id: id };
  const projection: { [key: string]: any } = { data: 1 };

  if (searchParams.get("categories")) {
    const categoriesFilter = searchParams.get("categories")?.split(",");

    _set(projection, "data.products", {
      $filter: {
        input: "$data.products",
        as: "product",
        cond: { $in: ["$$product.category", categoriesFilter] },
      },
    });
  }

  const userPayload = await User.findOne(filters, projection);
  return NextResponse.json(userPayload?.data?.products || [], { status: 200 });
};

export const createProduct = async (...args: any) =>
  errorHandler(
    ...(tokenHandler(createProductController, args) as [Function, []]),
  );

export const patchProduct = async (...args: any) =>
  errorHandler(
    ...(tokenHandler(patchProductController, args) as [Function, []]),
  );

export const deleteProduct = async (...args: any) =>
  errorHandler(deleteProductController, args);

export const getProduct = async (...args: any) =>
  errorHandler(getProductController, args);
