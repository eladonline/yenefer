"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ProductFormType, ProductType } from "@/types/apis/user/data";
import {
  createProduct,
  editProduct,
  getProducts,
  deleteProduct,
  publishProduct,
} from "@/app/services/products";
import { SubmitHandler, useForm, UseFormReturn } from "react-hook-form";
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { notification, UploadFile } from "antd/lib";
import { NotificationInstance } from "antd/lib/notification/interface";
import { useSearchParams } from "next/navigation";
import filtersUtil from "@/utils/Filters";
import { imageListToPayload } from "@/app/components/Inputs/Upload";
import { PublishProductPayloadType } from "@/types/apis/publish/publish.products";

const ProductContext = createContext<useProductsHook>({} as useProductsHook);

type useProductsHook = {
  products: ProductType[] | undefined;
  onSubmit: SubmitHandler<ProductFormType>;
  onSubmitEdit: SubmitHandler<ProductFormType>;
  onDeleteItem: (id: string) => Promise<void>;
  onPublishProduct: (
    id: string,
    payload: PublishProductPayloadType,
  ) => Promise<void>;
  urlFilters: {};
  currentlyInPublishRequest: string | null;
  setCurrentlyInPublishRequest: (
    name: useProductsHook["currentlyInPublishRequest"],
  ) => void;
  parseServerProductImages: (
    images: ProductType["images"],
  ) => UploadFile[] | null;
  productDefaultValues: ProductFormType;
};

export const productDefaultValues: ProductFormType = {
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
  lastUpdated: null,
  lastPublished: null,
  images: null,
  imagesToRemove: null,
  _id: null,
};

const useLogic = (
  initialData: ProductType[],
  notificationApi: NotificationInstance,
): useProductsHook => {
  const [currentlyInPublishRequest, setCurrentlyInPublishRequest] = useState<
    string | null
  >(null);
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
      const { images, ...restFields } = fields;
      const nextFields: ProductFormType = { ...restFields };

      if (images?.length) {
        nextFields.images = await imageListToPayload(images);
      }

      await createProduct(nextFields);
      await refetch();
    } catch (err: any) {
      notificationApi.error({ message: err.message });
      return Promise.reject(err);
    }
  };

  const onSubmitEdit = async ({
    _id,
    ...fields
  }: ProductFormType): Promise<void> => {
    try {
      const { images, ...restFields } = fields;
      const nextFields: ProductFormType = { ...restFields };

      if (images?.length) {
        const nextImages: UploadFile[] = [];

        for (let image of images) {
          if (image.url) continue;
          nextImages.push(...(await imageListToPayload([image])));
        }

        nextFields.images = nextImages;
      }

      await editProduct(_id as string, nextFields);
      await refetch();
    } catch (err: any) {
      notificationApi.error({ message: err.message });
    }
  };

  const onDeleteItem = async (_id: string): Promise<void> => {
    try {
      await deleteProduct(_id);
      await refetch();
    } catch (err: any) {
      notificationApi.error({ message: err.message });
    }
  };

  const onPublishProduct: useProductsHook["onPublishProduct"] = async (
    _id,
    payload,
  ) => {
    try {
      await publishProduct(_id, payload);
      await refetch();
    } catch (err: any) {
      notificationApi.error({ message: err.message });
    }
  };

  const parseServerProductImages: useProductsHook["parseServerProductImages"] =
    (images) => {
      return (
        images?.map(({ src: { url }, meta: { public_id } }) => ({
          uid: public_id,
          name: public_id,
          status: "done",
          url,
        })) || null
      );
    };

  return {
    products,
    onSubmit,
    onSubmitEdit,
    onDeleteItem,
    onPublishProduct,
    currentlyInPublishRequest,
    setCurrentlyInPublishRequest,
    urlFilters: filtersUtil.fromMapToJson(searchParams),
    parseServerProductImages,
    productDefaultValues,
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
