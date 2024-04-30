"use client";
import React, { FC, useCallback } from "react";
import { useProduct } from "@/app/(pages)/(home)/my-products/lib/useProduct";
import ProductsBar from "@/app/components/bars/products/ProductsBar";
import ProductCard from "@/app/(pages)/(home)/my-products/lib/ProductCard";
import { Empty } from "antd/lib";

const Products: FC = () => {
  const { products } = useProduct();

  const Products = (
    <ul className={"grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2"}>
      {products?.map((props) => {
        return <ProductCard key={props._id} {...props} />;
      })}
    </ul>
  );

  const EmptyPlaceholder = (
    <div className={"flex flex-grow justify-center"}>
      <Empty />
    </div>
  );

  return (
    <div className={"grid grid-cols-1 gap-[20px]"}>
      <ProductsBar />
      {products?.length ? Products : EmptyPlaceholder}
    </div>
  );
};

export default Products;
