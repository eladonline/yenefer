"use client";
import { useQuery } from "react-query";
import { ProductType } from "@/types/apis/usersData";
import { createProduct, getProducts } from "@/app/services/products";
import { SubmitHandler, useForm, UseFormReturn } from "react-hook-form";
import { createContext, FC, ReactNode, useContext } from "react";
import { notification } from "antd/lib";

const ProductContext = createContext<useProductsHook>({} as useProductsHook);

type useProductsHook = {
  products: ProductType[] | undefined;
  formFactory: UseFormReturn<ProductType>;
  onSubmit: SubmitHandler<ProductType>;
};

const useLogic = (initialData: ProductType[]): useProductsHook => {
  const [api] = notification.useNotification();

  const { data, error } = useQuery<{
    data: ProductType[];
  }>({
    queryKey: ["products"],
    queryFn: getProducts,
    initialData: { data: initialData },
  });

  const formFactory = useForm<ProductType>({
    defaultValues: {
      name: undefined,
      category: undefined,
      description: undefined,
      price: 0,
    },
  });

  if (error) {
    throw error;
  }
  const products: ProductType[] | undefined = data?.data;

  api.info({ message: "test" });
  const onSubmit = async (fields: ProductType) => {
    try {
      await createProduct(fields);
    } catch (err) {
      api.info({ message: "test" });
    }
  };

  return { products, formFactory, onSubmit };
};

const ProductProvider: FC<{ children: ReactNode; data: ProductType[] }> = ({
  children,
  data,
}) => {
  const values = useLogic(data);
  return (
    <ProductContext.Provider value={values}>{children}</ProductContext.Provider>
  );
};

export const useProduct = () => {
  return useContext(ProductContext);
};

export default ProductProvider;
