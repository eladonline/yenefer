import jwt, { Secret, SignOptions } from "jsonwebtoken";

type SignData = {
  usr: string;
};

class Jwt {
  secret: Secret;
  defaultOptions: SignOptions;
  constructor() {
    this.secret = process.env.jwtSecret || "default-secret-for-jwt";
    this.defaultOptions = {
      expiresIn: "1d",
    };
  }

  sign(data: SignData): string {
    return jwt.sign(data, this.secret, { expiresIn: "1d" });
  }

  verify(token: string) {
    return jwt.verify(token, this.secret);
  }
}

export default Jwt;
