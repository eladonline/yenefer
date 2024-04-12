"use client";
import React, { FC, useState } from "react";
import { useProduct } from "@/app/(pages)/(home)/my-products/lib/useProduct";
import ProductsBar from "@/app/components/bars/products/ProductsBar";
import { FormProvider } from "react-hook-form";
import ProductForm from "@/app/(pages)/(home)/my-products/lib/ProductForm";
import { useModal } from "@/utils/hooks/useModal/useModal";
import ProductCard from "@/app/(pages)/(home)/my-products/lib/ProductCard";
import { ModalProps } from "antd/lib";
import Filters from "@/app/components/bars/products/lib/Filters";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import _isEmpty from "lodash/isEmpty";

const Products: FC = () => {
  const {
    products,
    formFactory,
    onSubmit,
    resetFormToDefault,
    onSubmitEdit,
    onDeleteItem,
  } = useProduct();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [ModalRoot, modalApi] = useModal();
  const [modalConfigs, setModalConfigs] = useState<ModalProps>({});

  const {
    formState: { isSubmitting },
    handleSubmit,
    reset,
  } = formFactory;

  const handleAddProductClick = () => {
    setModalConfigs({
      title: "Add Product",
      onOk: async () => {
        await handleSubmit(onSubmit)();
        modalApi.close();
      },
      confirmLoading: isSubmitting,
      children: <ProductForm />,
      afterClose: resetFormToDefault,
    });
    modalApi.open();
  };

  const handleEditProductClick = () => {
    setModalConfigs({
      title: "Edit Product",
      onOk: async () => {
        handleSubmit(onSubmitEdit);
        modalApi.close();
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
          let query = "";
          for (let key in filters) query += `${key}=${filters[key]}`;
          router.push(`/my-products?${query}`);
        }
        modalApi.close();
      },
      children: (
        <Filters
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
        {products?.map(({ ...props }) => {
          return (
            <ProductCard
              loading={isSubmitting}
              onEdit={() => {
                reset({ ...props });
                handleEditProductClick();
              }}
              onDelete={() => onDeleteItem(props._id as string)}
              key={props._id}
              {...props}
            />
          );
        })}
      </ul>
    </div>
  );
};
export default Products;
