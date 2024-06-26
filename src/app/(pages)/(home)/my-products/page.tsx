import React from "react";
import ServerApi from "@/app/services/ServerApi";
import { endpoints } from "@/app/services/products";
import { headers } from "next/headers";
import Title from "antd/lib/typography/Title";
import Products from "@/app/(pages)/(home)/my-products/lib/Products";
import ProductProvider from "@/app/(pages)/(home)/my-products/lib/useProduct";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import filtersService from "@/utils/Filters";

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const serverApi = new ServerApi();

  const query = filtersService.fromJsonToQuery(
    searchParams as { [key: string]: string },
  );

  const data = await serverApi.get(`${endpoints.products}?${query}`, {
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
        <ProductProvider data={data}>
          <Products />
        </ProductProvider>
      </div>
    </AntdRegistry>
  );
};

export default Page;
