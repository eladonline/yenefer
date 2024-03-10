import TokenUtil from "@/utils/Token";
type DoLogin = {
  details: { username: string };
  token: string;
};

class AuthUtility {
  tokenUtil: TokenUtil;

  constructor() {
    this.tokenUtil = new TokenUtil();
  }

  doLogout() {
    this.tokenUtil.remove();
    localStorage.removeItem("user");
  }

  doLogin({ details, token }: DoLogin) {
    localStorage.setItem("user", JSON.stringify(details));
    this.tokenUtil.token = token;
  }
}

export default AuthUtility;
