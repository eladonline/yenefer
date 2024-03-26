import { useQuery } from "react-query";
import { ProductType } from "@/types/apis/usersData";
import { getProducts } from "@/app/services/userData";

type useProductsHook = {
  isLoading: boolean;
  products: ProductType[] | undefined;
};

const useProducts = (initialData: ProductType[]): useProductsHook => {
  const { data, isLoading, error } = useQuery<{
    data: ProductType[];
  }>({
    queryKey: ["products"],
    queryFn: getProducts,
    initialData: { data: initialData },
  });
  if (error) {
    throw error;
  }
  const products = data?.data;
  return { isLoading, products };
};

export default useProducts;
