import { useQuery } from "react-query";
import { userSettings } from "@/app/services/settings";

type ProductType = {
  name: string;
  category: string;
  description: string;
  price: number | string;
};
type ProductsType = {
  products: ProductType[];
};

type useProductsHook = {
  isLoading: boolean;
  products: ProductType[] | undefined;
};

const useProducts = (initialData: ProductsType): useProductsHook => {
  const { data, isLoading, error } = useQuery<{
    data: ProductsType;
  }>({
    queryKey: ["products"],
    queryFn: userSettings,
    initialData: { data: initialData },
  });
  if (error) {
    throw error;
  }
  console.log(data);
  const products = data?.data?.products;
  console.log(products);

  return { isLoading, products };
};

export default useProducts;
