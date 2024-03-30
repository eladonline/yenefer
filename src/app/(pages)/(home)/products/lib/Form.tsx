"use client";
import React, { ReactElement, FC } from "react";
import QueryClientProvider from "@/utils/Providers/QueryClientProvider";
import { useProduct } from "@/app/(pages)/(home)/products/lib/useProduct";
import { ProductType } from "@/types/apis/usersData";
import Menu from "@/app/(pages)/(home)/products/lib/Menu";
import { Modal } from "antd/lib";
import { FormProvider } from "react-hook-form";
import ProductForm from "@/app/(pages)/(home)/products/lib/ProductForm";

const Form: FC = () => {
  const { products, isLoading, formFactory, onSubmit } = useProduct();
  const [modal, contextHolder] = Modal.useModal();

  const productsEl: ReactElement<ProductType>[] | undefined = products?.map(
    ({ name }) => {
      return <li key={name}>{name}</li>;
    },
  );

  return (
    <div className={"grid grid-cols-1 gap-[20px]"}>
      <FormProvider {...formFactory}>
        <div>{contextHolder}</div>
      </FormProvider>
      <Menu
        onClickAddProduct={() => {
          modal.info({
            title: "Add new product",
            content: <ProductForm />,
            onOk: formFactory.handleSubmit(onSubmit),
            width: "max-content",
          });
        }}
      />
      <div className={"p-5 bg-white rounded "}>
        <QueryClientProvider>
          <ul className={"flex-col flex gap-3"}>{productsEl}</ul>
        </QueryClientProvider>
      </div>
    </div>
  );
};
export default Form;
