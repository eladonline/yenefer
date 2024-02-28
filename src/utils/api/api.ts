import axios, { Axios } from "axios";

class Api {
  http: Axios;

  constructor() {
    this.http = axios.create({
      baseURL: "http://localhost:3000",
      timeout: 3000,
    });
  }
}
const api = new Api();
export default api.http;
