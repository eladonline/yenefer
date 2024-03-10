import jwt, { Secret, SignOptions } from "jsonwebtoken";

class Jwt {
  secret: Secret;
  defaultOptions: SignOptions;
  constructor() {
    this.secret = process.env.JWT_SECRET_KEY || "default-secret-for-jwt";
    this.defaultOptions = {
      expiresIn: "1d",
    };
  }

  sign(data: object): string {
    return jwt.sign(data, this.secret, { expiresIn: "1d" });
  }

  verify(token: string) {
    return jwt.verify(token, this.secret);
  }
}

export default Jwt;
