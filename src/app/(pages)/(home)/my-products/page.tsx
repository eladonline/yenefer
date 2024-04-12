import React from "react";
import ServerApi from "@/app/services/ServerApi";
import { endpoints } from "@/app/services/products";
import { headers } from "next/headers";
import Title from "antd/lib/typography/Title";
import Products from "@/app/(pages)/(home)/my-products/lib/Products";
import ProductProvider from "@/app/(pages)/(home)/my-products/lib/useProduct";
import ModalProvider from "@/utils/hooks/useModal/useModal";
import { AntdRegistry } from "@ant-design/nextjs-registry";

const Page = async () => {
  const serverApi = new ServerApi();

  const data = await serverApi.get(endpoints.products, {
    headers: {
      id: headers().get("id") as string,
    },
  });
  return (
    <AntdRegistry>
      <div className={"p-5 grid justify-center grid-cols-1 md:grid-cols-1 "}>
        <header className={"text-center mb-4"}>
          <Title level={2}>Products</Title>
        </header>
        <ModalProvider>
          <ProductProvider data={data}>
            <Products />
          </ProductProvider>
        </ModalProvider>
      </div>
    </AntdRegistry>
  );
};
export default Page;
