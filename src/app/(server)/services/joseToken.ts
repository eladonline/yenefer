// EDGE runtime cannot do decryption on runtime therefore jose being used
import * as jose from "jose";

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
