export type ProductType = {
  name: string;
  category: string;
  description: string;
  price: number;
  created?: Date;
  terms: {
    min_price: number;
    discount_each_buyer: { value: number; unit: string };
    end_date: any;
    quantity: number;
  };
  _id?: string;
  images?: string[];
};

export type ProductFormType = {
  name: string | null;
  category: string | null;
  description: string | null;
  price: number | null;
  terms: {
    min_price: number | null;
    discount_each_buyer: { value: number | null; unit: string };
    end_date: any | null;
    quantity: number | null;
  };
  _id?: string | null;
};

export type UsersDataType = {
  products: ProductType[] | undefined;
  users_id: string;
} | null;
