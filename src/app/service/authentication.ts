"use client";
import api from "@/utils/api/api";
import { AxiosPromise } from "axios";

type PayloadLogin = {
  username: string;
  password: string;
};

class Authentication {
  login(payload: PayloadLogin): Promise<AxiosPromise> {
    return api.http.patch("/api/auth", payload);
  }
}
const authentication = new Authentication();
export default authentication;
