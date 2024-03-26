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
  const { name, category, description, price } = request.body;
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

export const getProductController = async (request: NextRequest) => {
  const id = request.headers.get("id");
  console.log(id);

  const userData: UsersDataType = await UserDataModel.findOne({
    users_id: id,
  });

  if (!userData) {
    console.log("!userData", userData);
    const error: ErrorType = new Error("User Data was not found");

    error.statusCode = 410;
    throw error;
  }

  return NextResponse.json(userData.products || [], { status: 200 });
};

export const createProduct = async (...args: any) =>
  errorHandler(createProductController, args);

export const getProduct = async (...args: any) =>
  errorHandler(getProductController, args);
