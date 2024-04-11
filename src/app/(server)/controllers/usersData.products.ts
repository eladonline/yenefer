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
  const { name, category, description, price } = await request.json();
  const product: ProductType = { name, category, description, price };
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

export const patchProductController = async (request: UserDataProductsType) => {
  const id = request.headers.get("id");
  const { name, category, description, price, _id } = await request.json();

  const product: ProductType = { name, category, description, price };
  await UserDataModel.findOneAndUpdate(
    {
      users_id: id,
      "products._id": _id,
    },
    {
      $set: {
        "products.$": product,
      },
    },
  );

  return NextResponse.json(
    { message: "Product updated successfully" },
    { status: 200 },
  );
};

export const getProductController = async (request: NextRequest) => {
  const id = request.headers.get("id");

  const data = await UserDataModel.findOne({
    users_id: id,
  }).select("products");

  return NextResponse.json(data?.products || [], { status: 200 });
};

export const createProduct = async (...args: any) =>
  errorHandler(createProductController, args);

export const patchProduct = async (...args: any) =>
  errorHandler(patchProductController, args);

export const getProduct = async (...args: any) =>
  errorHandler(getProductController, args);
