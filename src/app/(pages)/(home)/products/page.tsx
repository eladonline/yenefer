import React from "react";
import ServerApi from "@/app/services/ServerApi";
import { endpoints } from "@/app/services/userData";
import { headers } from "next/headers";
import Title from "antd/lib/typography/Title";
import Form from "@/app/(pages)/(home)/products/lib/Form";
import ProductProvider from "@/app/(pages)/(home)/products/lib/useProduct";

const Page = async () => {
  const serverApi = new ServerApi();

  const data = await serverApi.get(endpoints.products, {
    headers: {
      id: headers().get("id") as string,
    },
  });

  return (
    <div className={"p-5 grid justify-center grid-cols-1 md:grid-cols-1 "}>
      <header className={"text-center mb-4"}>
        <Title level={2}>Products</Title>
      </header>
      {data && (
        <ProductProvider data={data}>
          <Form />
        </ProductProvider>
      )}
    </div>
  );
};
export default Page;
