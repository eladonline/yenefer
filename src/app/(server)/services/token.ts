import * as jose from "jose";

export const tokenValidator = async (token: string): Promise<boolean> => {
  if (!token) return false;

  const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
  try {
    await jose.jwtVerify(token, secret);

    return true;
  } catch (err) {
    console.error(err, `token: ${token}`);
    return false;
  }
};

export const tokenDecrypt = async (
  token: string,
): Promise<jose.JWTPayload | null> => {
  if (!token) return null;

  const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
  try {
    const { payload } = await jose.jwtVerify(token, secret);

    return payload;
  } catch (err) {
    console.error(err, `token: ${token}`);
    return null;
  }
};
