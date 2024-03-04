import databaseConnect from "@/app/(server)/middlwares/database";
import crypto from "crypto";

export async function signIn(
  username: string,
  password: string,
): Promise<string | false> {
  const { db } = await databaseConnect();
  const res = await db?.collection("users").findOne({ email: username });
  const hash = crypto.
}
