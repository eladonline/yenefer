import axios, { AxiosInstance } from "axios";
import Utility from "./Utility";

class Api extends Utility {
  defaults: object;

  constructor() {
    super();
    this.defaults = {
      baseURL: "http://localhost:3000",
      timeout: 3000,
    };
  }

  get http(): AxiosInstance {
    const token = this.cookie.get("token");

    return axios.create({
      ...this.defaults,
      headers: { Authorization: token ? `Bearer ${token}` : null },
    });
  }
}
const api = new Api();
export default api;
