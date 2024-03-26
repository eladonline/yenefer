import { useQuery } from "react-query";
import { ProductType } from "@/types/apis/usersData";
import { getProducts } from "@/app/services/userData";

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
    queryFn: getProducts,
    initialData: { data: initialData },
  });
  if (error) {
    throw error;
  }
  const products = data?.data?.products;

  return { isLoading, products };
};

export default useProducts;
