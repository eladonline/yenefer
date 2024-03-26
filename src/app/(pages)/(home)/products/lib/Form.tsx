"use client";
import React from "react";
import QueryClientProvider from "@/utils/Providers/QueryClientProvider";
import useProduct from "@/app/(pages)/(home)/products/lib/useProduct";
import { ProductType } from "@/types/apis/usersData";

type FormProps = {
  data: ProductType[];
};

const Form: React.FC<FormProps> = ({ data }) => {
  const { products, isLoading } = useProduct(data);
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
