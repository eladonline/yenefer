"use client";
import React, { FC, useCallback, useMemo, useState } from "react";
import { useProduct } from "@/app/(pages)/(home)/my-products/lib/useProduct";
import ProductsBar from "@/app/components/bars/products/ProductsBar";
import { FormProvider } from "react-hook-form";
import ProductForm from "@/app/(pages)/(home)/my-products/lib/ProductForm";
import { useModal } from "@/utils/hooks/useModal/useModal";
import ProductCard from "@/app/(pages)/(home)/my-products/lib/ProductCard";
import { ModalProps, Empty, type UploadFile } from "antd/lib";
import Filters from "@/app/components/bars/products/lib/Filters";
import { useRouter } from "next/navigation";
import _isEmpty from "lodash/isEmpty";
import filtersService from "@/utils/Filters";
import { ProductFormType, ProductType } from "@/types/apis/user/data";

const Products: FC = () => {
  const {
    products,
    formFactory,
    onDeleteItem,
    onPublishProduct,
    currentlyInPublishRequest,
    setCurrentlyInPublishRequest,
  } = useProduct();

  const handlePublishProductClick = useCallback(
    (props: ProductType) => {
      setCurrentlyInPublishRequest(props.name);
      onPublishProduct(props._id as string, {
        name: props.name,
        category: props.category,
        description: props.description,
        price: props.price,
        terms: props.terms,
        images: props.images?.map(({ src: { url } }) => url),
      }).finally(() => setCurrentlyInPublishRequest(null));
    },
    [onPublishProduct, setCurrentlyInPublishRequest],
  );

  const productsMemo = useMemo(() => {
    return products?.map(({ ...props }) => {
      return (
        <ProductCard
          onPublish={() => handlePublishProductClick(props)}
          onDelete={() => onDeleteItem(props._id as string)}
          key={props._id}
          isPublishLoading={currentlyInPublishRequest === props.name}
          {...props}
        />
      );
    });
  }, [
    products,
    currentlyInPublishRequest,
    handlePublishProductClick,
    onDeleteItem,
  ]);

  return (
    <div className={"grid grid-cols-1 gap-[20px]"}>
      <FormProvider {...formFactory}>
        <ProductsBar />
        {products?.length ? (
          <ul
            className={"grid grid-cols-2 xl:grid-cols-3  2xl:grid-cols-4 gap-2"}
          >
            {productsMemo}
          </ul>
        ) : (
          <div className={"flex flex-grow justify-center"}>
            <Empty />
          </div>
        )}
      </FormProvider>
    </div>
  );
};

export default Products;
