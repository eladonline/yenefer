"use client";
import React, { FC, ReactElement, useState } from "react";
import { useProduct } from "@/app/(pages)/(home)/my-products/lib/useProduct";
import ProductsBar from "@/app/(pages)/(home)/my-products/lib/ProductsBar";
import { FormProvider } from "react-hook-form";
import ProductForm from "@/app/(pages)/(home)/my-products/lib/ProductForm";
import { useModal } from "@/utils/hooks/useModal/useModal";
import ProductCard from "@/app/(pages)/(home)/my-products/lib/ProductCard";
import { ModalProps } from "antd/lib";

const Products: FC = () => {
  const {
    products,
    formFactory,
    onSubmit,
    resetFormToDefault,
    onSubmitEdit,
    onDeleteItem,
  } = useProduct();
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
    setModalConfigs({
      title: "Filters",
      onOk: async () => {
        console.log("onOk");
        modalApi.close();
      },
      children: <div>filters</div>,
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
