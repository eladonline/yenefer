import api from "@/utils/api/api";
import { AxiosPromise } from "axios";
import Utitlity from "@/utils/api/Utility";

type PayloadLogin = {
  username: string;
  password: string;
};

class Authentication {
  login(payload: PayloadLogin): Promise<AxiosPromise> {
    return api.http.post("/api/auth", payload);
  }

  async tokenValidation() {
    const apiUtil = new Utitlity();
    if (apiUtil.cookie.has("token")) {
      await api.http.get("/api/auth");
    }

    return false;
  }
}
const authentication = new Authentication();
export default authentication;
