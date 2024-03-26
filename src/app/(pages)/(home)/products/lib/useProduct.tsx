import { useQuery } from "react-query";
import { userSettings } from "@/app/services/settings";

type ProductsType = {
  name: string;
  category: string;
  description: string;
  price: number | string;
};

type useProductsHook = {
  isLoading: boolean;
  products: { products: ProductsType | undefined };
};

const useProducts = (initialData: ProductsType): useProductsHook => {
  const { data, isLoading, error } = useQuery<{ data: ProductsType }>({
    queryKey: ["products"],
    queryFn: userSettings,
    initialData: { data: initialData },
  });
  if (error) {
    throw error;
  }
  const products = data?.data?.products;

  return { isLoading, products };
};

export default useProducts;
