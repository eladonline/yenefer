"use client";
import { useQuery } from "react-query";
import { ProductType } from "@/types/apis/usersData";
import {
  createProduct,
  editProduct,
  getProducts,
  deleteProduct,
} from "@/app/services/products";
import { SubmitHandler, useForm, UseFormReturn } from "react-hook-form";
import { createContext, FC, ReactNode, useContext } from "react";
import { notification } from "antd/lib";
import { NotificationInstance } from "antd/lib/notification/interface";

const ProductContext = createContext<useProductsHook>({} as useProductsHook);

type useProductsHook = {
  products: ProductType[] | undefined;
  formFactory: UseFormReturn<ProductType>;
  onSubmit: SubmitHandler<ProductType>;
  onSubmitEdit: SubmitHandler<ProductType>;
  resetFormToDefault: () => void;
  onDeleteItem: (id: string) => void;
};

const defaultValues = {
  name: undefined,
  category: undefined,
  description: undefined,
  price: 0,
  _id: undefined,
};

const useLogic = (
  initialData: ProductType[],
  notificationApi: NotificationInstance,
): useProductsHook => {
  const { data, error, refetch } = useQuery<{
    data: ProductType[];
  }>({
    queryKey: ["products"],
    queryFn: getProducts,
    initialData: { data: initialData },
    staleTime: Infinity,
  });

  const formFactory = useForm<ProductType>({
    defaultValues,
  });

  if (error) {
    notificationApi.error({ message: error as string });
  }
  const products: ProductType[] | undefined = data?.data;

  const onSubmit = async ({ _id, ...fields }: ProductType) => {
    try {
      await createProduct(fields);
      await refetch();
      resetFormToDefault();
    } catch (err: any) {
      notificationApi.error({ message: err.message });
    }
  };

  const onSubmitEdit = async ({ _id, ...fields }: ProductType) => {
    try {
      await editProduct(_id as string, fields);
      await refetch();
      resetFormToDefault();
    } catch (err: any) {
      notificationApi.error({ message: err.message });
    }
  };

  const onDeleteItem = async (_id: string) => {
    try {
      await deleteProduct(_id);
      await refetch();
      resetFormToDefault();
    } catch (err: any) {
      notificationApi.error({ message: err.message });
    }
  };

  const resetFormToDefault = () => {
    formFactory.reset(defaultValues);
  };

  return {
    products,
    formFactory,
    onSubmit,
    resetFormToDefault,
    onSubmitEdit,
    onDeleteItem,
  };
};

const ProductProvider: FC<{ children: ReactNode; data: ProductType[] }> = ({
  children,
  data,
}) => {
  const [notificationApi, contextHolder] = notification.useNotification();

  const values = useLogic(data, notificationApi);
  return (
    <ProductContext.Provider value={values}>
      {contextHolder}
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  return useContext(ProductContext);
};

export default ProductProvider;
