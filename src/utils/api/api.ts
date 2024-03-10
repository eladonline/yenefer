"use client";
import axios, { AxiosInstance } from "axios";
import Document from "../Document";
import AuthUtility from "@/utils/Auth";

class Api extends Document {
  defaults: object;
  http: AxiosInstance;

  constructor() {
    super();
    this.defaults = {
      baseURL: "http://localhost:3000",
      timeout: 3000,
    };
    this.http = axios.create({
      ...this.defaults,
    });

    this.http.interceptors.request.use((config) => {
      config.headers["Authorization"] =
        `Bearer ${this.getCookie("authorization")}`;
      return config;
    });

    this.http.interceptors.response.use(
      (response) => response,
      (err) => {
        if (
          err?.response?.status === 417 &&
          err?.response?.data === "Valid authorization expected"
        ) {
          const authUtility = new AuthUtility();
          authUtility.doLogout();
          window.location.replace("/login?reject");
        }
        throw err;
      },
    );
  }
}
const api = new Api();
export default api;
