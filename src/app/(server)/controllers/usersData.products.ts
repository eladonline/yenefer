import { NextRequest, NextResponse } from "next/server";
import errorHandler from "@/app/(server)/handlers/errorHandler";
import UserDataModel from "@/app/(server)/models/UsersData";
import { ProductType, UsersDataType } from "@/types/apis/usersData";
import { ErrorType } from "@/types/globalTypes";
import cloudinaryService from "@/app/(server)/services/cloudinary";
import Jwt, { clientTokenProps } from "@/app/(server)/services/Jwt";
import tokenHandler from "@/app/(server)/handlers/tokenHandler";
import { JwtPayload } from "jsonwebtoken";

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
  const userData: UsersDataType = await UserDataModel.findOne({
    users_id: id,
  });

  if (!userData) {
    const error: ErrorType = new Error("User userData was not found");

    error.statusCode = 410;
    throw error;
  }

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

  if (!userData.products) {
    userData.products = [product];
  } else {
    userData.products.push({ ...product });
  }

  await UserDataModel.replaceOne({ users_id: id }, userData);

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

  const dbImages = [];

  // for (let imageBuffer of images) {
  //   try {
  //     const uploadData = await cloudinaryService.api.upload(imageBuffer, {
  //       folder: usr,
  //     });
  //     const { signature, public_id, secure_url, url, folder } = uploadData;
  //     dbImages.push({
  //       meta: { signature, public_id, folder },
  //       src: { url, secure_url },
  //     });
  //   } catch (err) {
  //     console.trace(err);
  //   }
  // }

  await UserDataModel.findOneAndUpdate(
    {
      users_id: id,
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
  await UserDataModel.findOneAndUpdate(
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
  const filters: { [key: string]: any } = { users_id: id };
  const projection: { [key: string]: any } = {};

  const categoriesFilter = searchParams.get("categories")?.split(",");

  if (categoriesFilter) {
    projection["products"] = {
      $filter: {
        input: "$products",
        as: "products",
        cond: { $in: ["$$products.category", categoriesFilter] },
      },
    };
  }

  const data = await UserDataModel.findOne(filters, projection).select(
    "-products.terms.discount_each_buyer._id",
  );

  return NextResponse.json(data?.products || [], { status: 200 });
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
