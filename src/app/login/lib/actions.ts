import authentication from "@/app/server/authentication";

export async function authenticate(data: {
  username: string;
  password: string;
}) {
  const { username, password } = data;
  return await authentication.login({ username, password });
}
