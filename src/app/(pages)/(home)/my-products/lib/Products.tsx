"use client";
import React, { FC } from "react";
import { useProduct } from "@/app/(pages)/(home)/my-products/lib/useProduct";
import ActionsBar from "@/app/(pages)/(home)/my-products/lib/ActionsBar";
import { FormProvider } from "react-hook-form";
import ProductForm from "@/app/(pages)/(home)/my-products/lib/ProductForm";
import { useModal } from "@/utils/hooks/useModal/useModal";
import ProductCard from "@/app/(pages)/(home)/my-products/lib/ProductCard";

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
  const {
    formState: { isSubmitting },
    handleSubmit,
    reset,
  } = formFactory;

  return (
    <div className={"grid grid-cols-1 gap-[20px]"}>
      <FormProvider {...formFactory}>
        {ModalRoot({
          title: "Product",
          onOk: async () => {
            await handleSubmit((values) => {
              values._id ? onSubmitEdit(values) : onSubmit(values);
            })();
            modalApi.close();
          },
          confirmLoading: isSubmitting,
          children: <ProductForm />,
          afterClose: resetFormToDefault,
        })}
      </FormProvider>
      <ActionsBar onClickAddProduct={modalApi.open} />
      <ul className={"flex flex-wrap gap-3"}>
        {products?.map(({ ...props }) => {
          return (
            <ProductCard
              loading={isSubmitting}
              onEdit={() => {
                reset({ ...props });
                modalApi.open();
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
