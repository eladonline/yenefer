import jwt, { Secret, SignOptions, JwtPayload } from "jsonwebtoken";

export type clientTokenProps = { usr: string; license: string; id: string };
type serverTokenProps = { int: string };

class Jwt {
  secret: Secret;
  defaultOptions: SignOptions;
  constructor() {
    this.secret = process.env.JWT_SECRET_KEY || "default-secret-for-jwt";
    this.defaultOptions = {
      expiresIn: "1d",
    };
  }

  sign(data: clientTokenProps | serverTokenProps): string {
    return jwt.sign(data, this.secret, this.defaultOptions);
  }

  verify(token: string): JwtPayload | string {
    return jwt.verify(token, this.secret);
  }

  decode(token: string): string | JwtPayload | null {
    return jwt.decode(token);
  }
}

export default Jwt;
