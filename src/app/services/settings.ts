import { AxiosResponse } from "axios";
import api from "@/app/services/clientApi";

export const baseEndpoint = "/settings";

export const endpoints = {
  user: `${baseEndpoint}/user`,
  products: `${baseEndpoint}/products`,
};

export function userSettings(): Promise<AxiosResponse> {
  return api.http.get(endpoints.user);
}
