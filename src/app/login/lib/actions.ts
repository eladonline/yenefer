import authentication from "@/app/server/authentication";

export async function authenticate(data: {
  username: string;
  password: string;
}) {
  const { username, password } = data;
  const res = await authentication.login({ username, password });

  console.log(res);
  return res;
}
