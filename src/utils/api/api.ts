import axios, { Axios } from "axios";
class Api {
  instance: Axios;
  constructor() {
    this.instance = axios.create({
      baseURL: "http://localhost:3000",
      timeout: 3000,
    });
  }

  get http() {
    const token = sessionStorage.getItem("token");
    this.instance.defaults.headers.Authorization = `Bearer ${token}`;
    return this.instance;
  }

  get controller() {
    return new AbortController();
  }
}
const api = new Api();
export default api;
