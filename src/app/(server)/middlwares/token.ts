import Jwt from "@/app/(server)/services/Jwt";

export const tokenValidator = (token: string | undefined): boolean => {
  if (!token) return false;
  try {
    const jwt = new Jwt();
    jwt.verify(token);
    return true;
  } catch (err) {
    console.error(err, `token: ${token}`);
    return false;
  }
};
