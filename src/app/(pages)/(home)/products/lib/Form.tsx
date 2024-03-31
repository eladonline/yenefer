"use client";
import React, { ReactElement, FC, useCallback } from "react";
import QueryClientProvider from "@/utils/Providers/QueryClientProvider";
import { useProduct } from "@/app/(pages)/(home)/products/lib/useProduct";
import { ProductType } from "@/types/apis/usersData";
import Menu from "@/app/(pages)/(home)/products/lib/Menu";
import { FormProvider } from "react-hook-form";
import ProductForm from "@/app/(pages)/(home)/products/lib/ProductForm";
import { useModal } from "@/utils/hooks/useModal/useModal";
import { notification } from "antd/lib";

const Form: FC = () => {
  const [, contextHolder] = notification.useNotification();

  const { products, formFactory, onSubmit } = useProduct();
  const [ModalRoot, modalApi] = useModal();
  const {
    formState: { isSubmitting, errors },
    handleSubmit,
    reset,
  } = formFactory;

  const productsEl: ReactElement<ProductType>[] | undefined = products?.map(
    ({ name }) => {
      return <li key={name}>{name}</li>;
    },
  );

  return (
    <div className={"grid grid-cols-1 gap-[20px]"}>
      {contextHolder}
      <FormProvider {...formFactory}>
        {ModalRoot({
          title: "Add new product",
          onOk: async () => {
            await handleSubmit(onSubmit)();
            modalApi.close();
          },
          confirmLoading: isSubmitting,
          children: <ProductForm />,
          afterClose: () => {
            reset();
            console.log("closed");
          },
        })}
      </FormProvider>
      <Menu onClickAddProduct={modalApi.open} />
      <div className={"p-5 bg-white rounded "}>
        <QueryClientProvider>
          <ul className={"flex-col flex gap-3"}>{productsEl}</ul>
        </QueryClientProvider>
      </div>
    </div>
  );
};
export default Form;
