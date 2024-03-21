"use server";
import axios, { AxiosInstance } from "axios";

class ServerApi {
  defaults: object;
  http: AxiosInstance;

  constructor() {
    this.defaults = {
      baseURL: process.env.BASE_API_URI,
      timeout: 3000,
    };
    this.http = axios.create({
      ...this.defaults,
    });

    this.http.interceptors.request.use((config) => {
      const token = process.env.SERVER_TOKEN;
      config.headers["Authorization"] = `Bearer ${token}`;
      return config;
    });

    this.http.interceptors.response.use(
      (response) => response,
      (err) => {
        console.error(err.response.data);
        throw err;
      },
    );
  }
}
export default ServerApi;
