import { NextRequest, NextResponse } from "next/server";
import errorHandler from "@/app/(server)/handlers/errorHandler";
import UserDataModel from "@/app/(server)/models/UsersData";
import { ProductType, UsersDataType } from "@/types/apis/usersData";
import { ErrorType } from "@/types/globalTypes";

type UserDataProductsType = NextRequest & {
  body: ProductType;
};

export const createProductController = async (
  request: UserDataProductsType,
) => {
  const id = request.headers.get("id");
  const { name, category, description, price, terms } = await request.json();
  const product: ProductType = { name, category, description, price, terms };
  const userData: UsersDataType = await UserDataModel.findOne({
    users_id: id,
  });

  if (!userData) {
    const error: ErrorType = new Error("User userData was not found");

    error.statusCode = 410;
    throw error;
  }

  if (!userData.products) {
    userData.products = [product];
  } else {
    userData.products.push(product);
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
  const { name, category, description, price, terms } = await request.json();

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
  errorHandler(createProductController, args);

export const patchProduct = async (...args: any) =>
  errorHandler(patchProductController, args);

export const deleteProduct = async (...args: any) =>
  errorHandler(deleteProductController, args);

export const getProduct = async (...args: any) =>
  errorHandler(getProductController, args);
