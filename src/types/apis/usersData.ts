export type ProductType = {
  name: string;
  category: string;
  description: string;
  price: number | string;
};

export type UsersDataType = {
  products: ProductType[] | undefined;
  users_id: string;
} | null;
