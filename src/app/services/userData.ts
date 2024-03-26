import { AxiosResponse } from "axios";
import api from "@/app/services/clientApi";

export const endpoints = {
  products: `/products`,
};

export function getProducts(): Promise<AxiosResponse> {
  return api.http.get(endpoints.products);
}
