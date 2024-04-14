export type ProductType = {
  name: string;
  category: string;
  description: string;
  price: number;
  created?: Date;
  terms: {
    min_price: number;
    discount_each_buyer: number;
    end_date: Date;
    max_buyers: number;
  };
  _id?: string;
};

export type UsersDataType = {
  products: ProductType[] | undefined;
  users_id: string;
} | null;
