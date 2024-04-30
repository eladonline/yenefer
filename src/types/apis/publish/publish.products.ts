export type PublishProductType = {
  publisher_id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  terms: {
    min_price: number;
    discount_each_buyer: { value: number; unit: string };
    end_date: Date;
    quantity: number;
  };
  last_published: Date | null;
  images?: string[];
};

export type PublishProductPayloadType = {
  name: string;
  category: string;
  description: string;
  price: number;
  terms: {
    min_price: number;
    discount_each_buyer: { value: number; unit: string };
    end_date: Date;
    quantity: number;
  };
  images?: string[];
};
