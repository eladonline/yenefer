import axios, { AxiosInstance } from "axios";
import Document from "../Document";

class Api extends Document {
  defaults: object;

  constructor() {
    super();
    this.defaults = {
      baseURL: "http://localhost:3000",
      timeout: 3000,
    };
  }
  get axios(): AxiosInstance {
    return axios.create({
      ...this.defaults,
    });
  }

  get http(): AxiosInstance {
    const token = this.getCookie("token");
    return axios.create({
      ...this.defaults,
      headers: { Authorization: token ? `Bearer ${token}` : null },
    });
  }
}
const api = new Api();
export default api;
