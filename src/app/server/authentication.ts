"use server";
import { cookies } from "next/headers";
import api from "@/utils/api/api";

type PayloadLogin = {
  username: null | FormDataEntryValue | string;
  password: null | FormDataEntryValue | string;
};

class Authentication {
  async login(payload: PayloadLogin) {
    console.log(payload);
    return await api.http.post("/api/auth", { body: payload });
  }

  async tokenValidation() {
    if (cookies().has("token")) {
      await api.http.get("/api/auth");
    }

    return false;
  }
}
const authentication = new Authentication();
export default authentication;
