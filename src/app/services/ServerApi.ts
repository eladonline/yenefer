"use server";
import _set from "lodash/set";
type Config = {
  [key: string]: string | Object;
};

class ServerApi {
  baseURL: string | undefined;
  Authorization: string;
  timeout: number;

  constructor() {
    this.baseURL = process.env.BASE_API_URI;
    this.Authorization = `Bearer ${process.env.SERVER_TOKEN}`;
    this.timeout = 3000;
  }

  async get(url: string, config: Config) {
    _set(config, "headers.Authorization", this.Authorization);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    const res = await fetch(this.baseURL + url, {
      ...config,
      signal: controller.signal,
    }).finally(() => {
      clearTimeout(timeoutId);
    });
    const result = await res.json();

    if (res.status !== 200) throw new Error(result.message);
    return result;
  }
}

export default ServerApi;
