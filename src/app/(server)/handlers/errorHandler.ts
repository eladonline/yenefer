import { NextResponse } from "next/server";

const errorHandler = async <T>(
  callback: Function,
  args: T[],
): Promise<NextResponse> => {
  try {
    return await callback(...args);
  } catch (err: ReturnType<typeof Error> | any) {
    return NextResponse.json(
      { message: err.message || "Something went wrong" },
      { status: err.statusCode || 500 },
    );
  }
};

export default errorHandler;
