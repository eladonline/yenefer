"use client";
import DocumentUtility from "@/utils/Document";

class Token {
  documentUtility: DocumentUtility;
  constructor() {
    this.documentUtility = new DocumentUtility();
  }

  set token(token: string) {
    this.documentUtility.cookie = `token=${token}`;
  }

  get token(): string {
    return this.documentUtility.getCookie("token");
  }

  remove(key: string) {
    this.documentUtility.removeCookie(key);
  }
  removeAllTokens() {
    this.documentUtility.removeCookie("token");
    this.documentUtility.removeCookie("authorization");
  }
}
export default Token;
