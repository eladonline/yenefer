"use client";
import React, {
  FC,
  MouseEventHandler,
  ReactDOM,
  ReactElement,
  ReactEventHandler,
  useRef,
  useState,
} from "react";
import { useProduct } from "@/app/(pages)/(home)/my-products/lib/useProduct";
import ProductsBar from "@/app/components/bars/products/ProductsBar";
import { FormProvider } from "react-hook-form";
import ProductForm from "@/app/(pages)/(home)/my-products/lib/ProductForm";
import { useModal } from "@/utils/hooks/useModal/useModal";
import ProductCard from "@/app/(pages)/(home)/my-products/lib/ProductCard";
import { ModalProps, Empty } from "antd/lib";
import Filters from "@/app/components/bars/products/lib/Filters";
import { useRouter } from "next/navigation";
import _isEmpty from "lodash/isEmpty";
import filtersService from "@/utils/Filters";
import { ProductFormType } from "@/types/apis/usersData";

const Products: FC = () => {
  const {
    products,
    formFactory,
    onSubmit,
    resetFormToDefault,
    onSubmitEdit,
    onDeleteItem,
    urlFilters,
  } = useProduct();
  const router = useRouter();

  const [ModalRoot, modalApi] = useModal();
  const [modalConfigs, setModalConfigs] = useState<ModalProps>({});

  const {
    formState: { isSubmitting, isValid },
    handleSubmit,
    reset,
  } = formFactory;

  const handleAddProductClick = () => {
    setModalConfigs({
      title: "Add Product",
      onOk: () => {
        handleSubmit(onSubmit, Promise.reject)()
          .then(modalApi.close)
          .catch(() => formFactory.trigger());
      },
      confirmLoading: isSubmitting,
      children: <ProductForm />,
      afterClose: resetFormToDefault,
    });
    modalApi.open();
  };
  const handleEditProductClick = (props: ProductFormType) => {
    reset({ ...props });
    setModalConfigs({
      title: "Edit Product",
      onOk: async () => {
        await handleSubmit(onSubmitEdit, Promise.reject)()
          .then(modalApi.close)
          .catch(() => formFactory.trigger());
      },
      confirmLoading: isSubmitting,
      children: <ProductForm />,
      afterClose: resetFormToDefault,
    });
    modalApi.open();
  };

  const handleFiltersClick = () => {
    let filters: { [key: string]: string } = {};
    setModalConfigs({
      title: "Filters",
      onOk: async () => {
        if (!_isEmpty(filters)) {
          const query = filtersService.fromJsonToQuery(filters);
          router.push(`/my-products?${query}`);
        }

        modalApi.close();
      },
      children: (
        <Filters
          defaultValues={urlFilters}
          onChange={(key: string, values: string[]) => {
            filters[key] = values.map((item) => item.toLowerCase()).join();
          }}
        />
      ),
      width: 600,
    });
    modalApi.open();
  };

  return (
    <div className={"grid grid-cols-1 gap-[20px]"}>
      <FormProvider {...formFactory}>{ModalRoot(modalConfigs)}</FormProvider>
      <ProductsBar
        onFiltersClick={handleFiltersClick}
        onAddProductClick={handleAddProductClick}
      />
      <ul className={"flex flex-wrap gap-3"}>
        {products?.length ? (
          products.map(({ ...props }) => {
            return (
              <ProductCard
                loading={isSubmitting}
                onEdit={() => handleEditProductClick(props)}
                onDelete={(e) => {
                  let target = e.currentTarget;
                  target.style.visibility = "hidden";
                  onDeleteItem(props._id as string).catch(() => {
                    target.style.visibility = "visible";
                  });
                }}
                key={props._id}
                {...props}
              />
            );
          })
        ) : (
          <div className={"flex flex-grow justify-center"}>
            <Empty />
          </div>
        )}
      </ul>
    </div>
  );
};
export default Products;
