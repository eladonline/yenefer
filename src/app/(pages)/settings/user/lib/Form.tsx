"use client";
import React from "react";
import QueryClientProvider from "@/utils/Providers/QueryClientProvider";
import { ProductType } from "@/types/apis/usersData";
import useProducts from "@/app/(pages)/(home)/products/lib/useProduct";

type FormProps = {
  data: ProductType;
};
const Form: React.FC<FormProps> = ({ data }) => {
  const { products, isLoading } = useProducts(data);

  console.log(products);

  return (
    <div className={"p-5 bg-white rounded"}>
      <QueryClientProvider>
        <ul className={"flex-col flex gap-3"}>test</ul>
      </QueryClientProvider>
    </div>
  );
};
export default Form;
