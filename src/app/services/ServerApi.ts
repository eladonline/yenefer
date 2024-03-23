"use server";
import _set from "lodash/set";
type Config = {
  headers: {
    [key: string]: string;
  };
};

class ServerApi {
  baseURL: string | undefined;
  Authorization: string;

  constructor() {
    this.baseURL = process.env.BASE_API_URI;
    this.Authorization = `Bearer ${process.env.SERVER_TOKEN}`;
  }

  async get(url: string, config: Config) {
    _set(config, "headers.Authorization", this.Authorization);

    const res = await fetch(this.baseURL + url, config);

    return res.json();
  }
}

export default ServerApi;
