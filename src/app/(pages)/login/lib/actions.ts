import authentication from "@/app/service/authentication";
import { AxiosResponse } from "axios";

export async function authenticate(data: {
  username: string;
  password: string;
}): Promise<AxiosResponse> {
  const { username, password } = data;
  const res = await authentication.login({ username, password });

  console.log(res);
  return res;
}
