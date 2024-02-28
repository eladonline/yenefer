import axios, { Axios } from "axios";
import { cookies } from "next/headers";

class Api {
  instance: Axios;
  constructor() {
    this.instance = axios.create({
      baseURL: "http://localhost:3000",
      timeout: 3000,
    });
  }

  get http() {
    const token = cookies().get("token");
    // @ts-ignore
    this.instance.defaults.headers.Authorization = `Bearer ${token}`;
    return this.instance;
  }

  get controller() {
    return new AbortController();
  }
}
const api = new Api();
export default api;
