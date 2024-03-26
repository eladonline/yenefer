import { NextRequest, NextResponse } from "next/server";
import errorHandler from "@/app/(server)/handlers/errorHandler";
import SettingsModel from "@/app/(server)/models/Configurations";
import { ProductType, ConfigurationsType } from "@/types/apis/configurations";
import { ErrorType } from "@/types/globalTypes";

type SettingsProductsType = NextRequest & {
  body: ProductType;
};

export const createProductController = async (
  request: SettingsProductsType,
) => {
  const id = request.headers.get("id");
  const { name, category, description, price } = request.body;
  const product: ProductType = { name, category, description, price };

  const settings: ConfigurationsType = await SettingsModel.findOne({
    users_id: id,
  });

  if (!settings) {
    const error: ErrorType = new Error("User settings was not found");

    error.statusCode = 410;
    throw error;
  }

  if (!settings.products) {
    settings.products = [product];
  } else {
    settings.products.push(product);
  }
  await SettingsModel.replaceOne({ users_id: id }, settings);

  return NextResponse.json(
    { message: "Product created successfully" },
    { status: 200 },
  );
};

export const createProduct = async (...args: any) =>
  errorHandler(createProductController, args);

export const getProductController = async (request: NextRequest) => {
  const id = request.headers.get("id");

  const settings: ConfigurationsType = await SettingsModel.findOne({
    users_id: id,
  });

  if (!settings) {
    const error: ErrorType = new Error("User settings was not found");

    error.statusCode = 410;
    throw error;
  }

  return NextResponse.json(
    { message: "Product created successfully" },
    { status: 200 },
  );
};

export const getProduct = async (...args: any) =>
  errorHandler(getProductController, args);
