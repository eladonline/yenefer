import jwt, { Secret, SignOptions, JwtPayload } from "jsonwebtoken";

class Jwt {
  secret: Secret;
  defaultOptions: SignOptions;
  constructor() {
    this.secret = process.env.JWT_SECRET_KEY || "default-secret-for-jwt";
    this.defaultOptions = {
      expiresIn: "1d",
    };
  }

  sign(data: { usr: string; license: string; id: string }): string {
    return jwt.sign(data, this.secret, this.defaultOptions);
  }

  verify(token: string): JwtPayload | string {
    return jwt.verify(token, this.secret);
  }
}

export default Jwt;
