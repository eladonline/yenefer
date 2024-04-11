import { AxiosResponse } from "axios";
import api from "@/app/services/clientApi";
import { ProductType } from "@/types/apis/usersData";

export const endpoints = {
  products: `/products`,
};

export function getProducts(): Promise<AxiosResponse> {
  return api.http.get(endpoints.products);
}

export function createProduct(body: ProductType): Promise<AxiosResponse> {
  return api.http.post(endpoints.products, body);
}

export function editProduct(body: ProductType): Promise<AxiosResponse> {
  return api.http.patch(endpoints.products, body);
}
