"use client";
import api from "@/utils/api/api";
import axios, { AxiosPromise } from "axios";

type PayloadLogin = {
  username: string;
  password: string;
};

class Authentication {
  login(payload: PayloadLogin): Promise<AxiosPromise> {
    return api.http.post("/api/auth", payload);
  }

  async tokenValidation(token: string): Promise<boolean> {
    const res = await fetch("http://localhost:3000/api/auth", {
      credentials: "include",
      headers: { Cookie: `token=${token}` },
    });

    return res.status === 200;
  }
}
const authentication = new Authentication();
export default authentication;
