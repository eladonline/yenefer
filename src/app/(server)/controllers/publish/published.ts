import { NextRequest, NextResponse } from "next/server";
import errorHandler from "@/app/(server)/handlers/errorHandler";

export const getPublishedController = async (request: NextRequest) => {
  return NextResponse.json([], { status: 200 });
};

export const getPublishedProduct = async (...args: any) =>
  errorHandler(getPublishedController, args);
