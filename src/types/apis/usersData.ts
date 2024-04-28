import type { UploadFile } from "antd/lib";

export type ProductType = {
  name: string;
  category: string;
  description: string;
  price: number;
  created?: Date;
  terms: {
    min_price: number;
    discount_each_buyer: { value: number; unit: string };
    end_date: Date;
    quantity: number;
  };
  lastUpdated?: number | null;
  lastPublished?: number | null;
  _id?: string;
  images?: {
    meta: { signature: string; public_id: string; folder: string };
    src: { url: string; secure_url: string };
  }[];
};

export type ProductFormType = {
  name: string | null;
  category: string | null;
  description: string | null;
  price: number | null;
  terms: {
    min_price: number | null;
    discount_each_buyer: { value: number | null; unit: string };
    end_date: Date | null;
    quantity: number | null;
  };
  lastUpdated?: Date | null;
  lastPublished?: Date | null;
  images?: UploadFile[] | null;
  imagesToRemove?: string[] | null;
  _id?: string | null;
};

export type UsersDataType = {
  products?: ProductType[] | undefined;
} | null;
