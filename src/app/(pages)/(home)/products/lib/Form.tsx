"use client";
import React, { ReactElement } from "react";
import QueryClientProvider from "@/utils/Providers/QueryClientProvider";
import useProduct from "@/app/(pages)/(home)/products/lib/useProduct";
import { ProductType } from "@/types/apis/usersData";
import Menu from "@/app/(pages)/(home)/products/lib/Menu";
import { Modal } from "antd/lib";

type FormProps = {
  data: ProductType[];
};

const Form: React.FC<FormProps> = ({ data }) => {
  const { products, isLoading } = useProduct(data);
  const [modal, contextHolder] = Modal.useModal();

  const productsEl: ReactElement<ProductType>[] | undefined = products?.map(
    ({ name }) => {
      return <li key={name}>{name}</li>;
    },
  );

  return (
    <div className={"grid grid-cols-1 gap-[20px]"}>
      <div>{contextHolder}</div>
      <Menu modalApi={modal} />
      <div className={"p-5 bg-white rounded "}>
        <QueryClientProvider>
          <ul className={"flex-col flex gap-3"}>{productsEl}</ul>
        </QueryClientProvider>
      </div>
    </div>
  );
};
export default Form;
