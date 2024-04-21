"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ProductFormType, ProductType } from "@/types/apis/usersData";
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
import { imageListPreparePayload } from "@/app/components/Inputs/Upload";

const ProductContext = createContext<useProductsHook>({} as useProductsHook);

type useProductsHook = {
  products: ProductType[] | undefined;
  formFactory: UseFormReturn<ProductFormType>;
  onSubmit: SubmitHandler<ProductFormType>;
  onSubmitEdit: SubmitHandler<ProductFormType>;
  resetFormToDefault: () => void;
  onDeleteItem: (id: string) => Promise<void>;
  urlFilters: {};
};

export const productDefaultValues = {
  name: null,
  category: null,
  description: null,
  price: null,
  terms: {
    discount_each_buyer: { value: null, unit: "nis" },
    quantity: null,
    min_price: null,
    end_date: null,
  },
  images: null,
  _id: null,
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
  const formFactory = useForm<ProductFormType>({
    defaultValues: { ...productDefaultValues },
  });

  useEffect(() => {
    queryClient.setQueryData(["products"], { data: initialData });
  }, [queryClient, initialData]);

  if (error) {
    notificationApi.error({ message: error.message });
  }

  const products: ProductType[] | undefined = data?.data;

  const onSubmit = async ({
    _id,
    ...fields
  }: ProductFormType): Promise<void> => {
    try {
      const { images } = fields;
      const nextFields = { ...fields };

      if (images?.length) {
        nextFields.images = await imageListPreparePayload(images);
      }

      await createProduct(nextFields);
      await refetch();
      formFactory.reset({ ...productDefaultValues });
    } catch (err: any) {
      notificationApi.error({ message: err.message });
    }
  };

  const onSubmitEdit = async ({ _id, ...fields }: ProductFormType) => {
    try {
      const nextFields = { ...fields };

      await editProduct(_id as string, nextFields);
      await refetch();
      formFactory.reset({ ...productDefaultValues });
    } catch (err: any) {
      notificationApi.error({ message: err.message });
    }
  };

  const onDeleteItem = async (_id: string): Promise<void> => {
    try {
      await deleteProduct(_id);
      await refetch();
      formFactory.reset({ ...productDefaultValues });
    } catch (err: any) {
      notificationApi.error({ message: err.message });
      return Promise.reject();
    }
  };

  return {
    products,
    formFactory,
    onSubmit,
    resetFormToDefault: () => formFactory.reset({ ...productDefaultValues }),
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
