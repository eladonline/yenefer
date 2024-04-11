"use client";
import { useQuery } from "react-query";
import { ProductType } from "@/types/apis/usersData";
import {
  createProduct,
  editProduct,
  getProducts,
} from "@/app/services/products";
import { SubmitHandler, useForm, UseFormReturn } from "react-hook-form";
import { createContext, FC, ReactNode, useContext } from "react";
import { notification } from "antd/lib";

const ProductContext = createContext<useProductsHook>({} as useProductsHook);

type useProductsHook = {
  products: ProductType[] | undefined;
  formFactory: UseFormReturn<ProductType & { isEdit?: boolean }>;
  onSubmit: SubmitHandler<ProductType>;
  onSubmitEdit: SubmitHandler<ProductType>;
  resetFormToDefault: () => void;
};

const defaultValues = {
  name: undefined,
  category: undefined,
  description: undefined,
  price: 0,
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
    defaultValues,
  });

  if (error) {
    throw error;
  }
  const products: ProductType[] | undefined = data?.data;

  const onSubmit = async (fields: ProductType) => {
    try {
      await createProduct(fields);
    } catch (err) {
      api.info({ message: "test" });
    }
  };

  const onSubmitEdit = async ({ ...fields }: ProductType) => {
    try {
      // await editProduct(fields);
    } catch (err) {
      api.info({ message: "test" });
    }
  };
  const resetFormToDefault = () => {
    formFactory.reset(defaultValues);
  };

  return { products, formFactory, onSubmit, resetFormToDefault, onSubmitEdit };
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
