import DocumentUtility from "@/utils/Document";

class Token {
  document: DocumentUtility;
  constructor() {
    this.document = new DocumentUtility();
  }

  set token(token: string) {
    this.document.cookie = `token=${token}`;
  }

  get token(): string {
    return this.document.getCookie("token");
  }
}
export default Token;
