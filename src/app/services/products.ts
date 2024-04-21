import { AxiosResponse } from "axios";
import api from "@/app/services/clientApi";
import { ProductFormType, ProductType } from "@/types/apis/usersData";

export const endpoints = {
  products: `/products`,
};

export function getProducts(query: string | undefined): Promise<AxiosResponse> {
  let endpoint = endpoints.products;
  if (query) endpoint += query;
  return api.http.get(endpoint);
}

export function createProduct(body: ProductFormType): Promise<AxiosResponse> {
  return api.http.post(endpoints.products, body);
}

export function editProduct(
  _id: string,
  body: ProductFormType,
): Promise<AxiosResponse> {
  return api.http.patch(`${endpoints.products}/${_id}`, body);
}

export function deleteProduct(_id: string): Promise<AxiosResponse> {
  return api.http.delete(`${endpoints.products}/${_id}`);
}
