"use client";
import { useQuery, useQueryClient } from "react-query";
import { ProductType } from "@/types/apis/usersData";
import {
  createProduct,
  editProduct,
  getProducts,
  deleteProduct,
} from "@/app/services/products";
import { SubmitHandler, useForm, UseFormReturn } from "react-hook-form";
import { createContext, FC, ReactNode, useContext, useEffect } from "react";
import { notification } from "antd/lib";
import { NotificationInstance } from "antd/lib/notification/interface";
import { useSearchParams } from "next/navigation";
import filtersUtil from "@/utils/Filters";

const ProductContext = createContext<useProductsHook>({} as useProductsHook);

type useProductsHook = {
  products: ProductType[] | undefined;
  formFactory: UseFormReturn<ProductType>;
  onSubmit: SubmitHandler<ProductType>;
  onSubmitEdit: SubmitHandler<ProductType>;
  resetFormToDefault: () => void;
  onDeleteItem: (id: string) => void;
  urlFilters: {};
};

const defaultValues = {
  name: "",
  category: "",
  description: "",
  price: 0,
  _id: "",
};

const useLogic = (
  initialData: ProductType[],
  notificationApi: NotificationInstance,
): useProductsHook => {
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  let query = "";
  searchParams.forEach((value, key) => {
    query += `${query ? "&" : "?"}` + `${key}=${value}`;
  });

  const { data, error, refetch } = useQuery<{
    data: ProductType[];
  }>({
    queryKey: ["products"],
    queryFn: () => getProducts(query),
    initialData: { data: initialData },
    staleTime: Infinity,
  });
  const formFactory = useForm<ProductType>({
    defaultValues,
  });

  useEffect(() => {
    queryClient.setQueryData("products", { data: initialData });
  }, [queryClient, initialData]);

  if (error) {
    notificationApi.error({ message: error as string });
  }
  const products: ProductType[] | undefined = data?.data;

  const onSubmit = async ({ _id, ...fields }: ProductType) => {
    try {
      await createProduct(fields);
      await refetch();
      formFactory.reset({ ...defaultValues });
    } catch (err: any) {
      notificationApi.error({ message: err.message });
    }
  };

  const onSubmitEdit = async ({ _id, ...fields }: ProductType) => {
    try {
      await editProduct(_id as string, fields);
      await refetch();
      formFactory.reset({ ...defaultValues });
    } catch (err: any) {
      notificationApi.error({ message: err.message });
    }
  };

  const onDeleteItem = async (_id: string) => {
    try {
      await deleteProduct(_id);
      await refetch();
      formFactory.reset({ ...defaultValues });
    } catch (err: any) {
      notificationApi.error({ message: err.message });
    }
  };
  return {
    products,
    formFactory,
    onSubmit,
    resetFormToDefault: () => {
      console.log("reset", defaultValues);
      formFactory.reset({ ...defaultValues });
    },
    onSubmitEdit,
    onDeleteItem,
    urlFilters: filtersUtil.fromMapToJson(searchParams),
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
