import { NextResponse } from "next/server";

const errorHandler = async <T>(
  callback: Function,
  args: T[],
): Promise<NextResponse> => {
  try {
    return await callback(...args);
  } catch (err: ReturnType<typeof Error> | any) {
    console.log("ERROR:", err);
    console.log(err.stack);
    let status = 500;
    let message = "Something went wrong";

    if (err.statusCode) status = err.statusCode;
    if (err.message) status = err.message;

    return NextResponse.json({ message }, { status });
  }
};

export default errorHandler;
