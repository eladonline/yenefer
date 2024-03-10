import TokenUtil from "@/utils/Token";
import DocumentUtility from "@/utils/Document";

type DoLogin = {
  details: { username: string };
  token: string;
  authorization: string; // authorization token
};

class AuthUtility {
  tokenUtil: TokenUtil;
  documentUtil: DocumentUtility;

  constructor() {
    this.tokenUtil = new TokenUtil();
    this.documentUtil = new DocumentUtility();
  }

  doLogout() {
    this.tokenUtil.removeAllTokens();
    localStorage.removeItem("user");
  }

  doLogin({ details, token, authorization }: DoLogin) {
    localStorage.setItem("user", JSON.stringify(details));
    this.tokenUtil.token = token;
    this.documentUtil.cookie = `authorization=${authorization}`;
  }
}

export default AuthUtility;
