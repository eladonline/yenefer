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

  remove() {
    this.documentUtility.removeCookie("token");
  }
}
export default Token;
