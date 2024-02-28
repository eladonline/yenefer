import http from "@/utils/api/api";

type PayloadLogin = {
  username: string;
  password: string;
};

class Authentication {
  async login(payload: PayloadLogin) {
    return await http.post("/api/auth", payload);
  }

  // async tokenValidation() {
  //   if (cookies().has("token")) {
  //     await api.http.get("/api/auth");
  //   }
  //
  //   return false;
  // }
}
const authentication = new Authentication();
export default authentication;
