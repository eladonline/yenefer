import { NextResponse } from "next/server";

const errorHandler = async <T>(
  callback: Function,
  args: T[],
): Promise<NextResponse> => {
  try {
    return await callback(...args);
  } catch (err: ReturnType<typeof Error> | any) {
    console.log(err.stack);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
};

export default errorHandler;
