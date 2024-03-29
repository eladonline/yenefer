import { useQuery } from "react-query";
import { ProductType } from "@/types/apis/usersData";
import { getProducts } from "@/app/services/userData";
import { useForm, UseFormReturn } from "react-hook-form";

type useProductsHook = {
  isLoading: boolean;
  products: ProductType[] | undefined;
  formFactory: UseFormReturn<ProductType>;
};

const useProducts = (initialData: ProductType[]): useProductsHook => {
  const { data, isLoading, error } = useQuery<{
    data: ProductType[];
  }>({
    queryKey: ["products"],
    queryFn: getProducts,
    initialData: { data: initialData },
  });
  const formFactory = useForm<ProductType>({});

  if (error) {
    throw error;
  }
  const products: ProductType[] | undefined = data?.data;
  return { isLoading, products, formFactory };
};

export default useProducts;
