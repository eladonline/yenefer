import authentication from "@/app/server/authentication";

export async function authenticate(prevState: unknown, formData: FormData) {
  const [username, password] = [
    formData.get("email"),
    formData.get("password"),
  ];
  try {
    const res = await authentication.login({ username, password });
    console.log(res);
  } catch (error) {}
}
