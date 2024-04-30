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
    onSubmit,
    resetFormToDefault,
    onSubmitEdit,
    onDeleteItem,
    urlFilters,
    onPublishProduct,
    currentlyInPublishRequest,
    setCurrentlyInPublishRequest,
  } = useProduct();
  const router = useRouter();

  const [ModalRoot, modalApi] = useModal();
  const [modalConfigs, setModalConfigs] = useState<ModalProps>({});
  const {
    formState: { errors },
    handleSubmit,
    reset,
  } = formFactory;

  const handleAddProductClick = () => {
    setModalConfigs({
      title: "Add Product",
      onOk: () => {
        setModalConfigs((prev) => ({ ...prev, confirmLoading: true }));
        handleSubmit(onSubmit, Promise.reject)()
          .then(modalApi.close)
          .catch(() => {
            setModalConfigs((prev) => ({ ...prev, confirmLoading: false }));
          });
      },
      children: <ProductForm />,
      afterClose: () => {
        setModalConfigs({ children: null });
        resetFormToDefault();
      },
    });
    modalApi.open();
  };

  const handleEditProductClick = useCallback(
    (props: ProductType) => {
      const images = parseServerProductImages(props.images);
      reset({ ...props, images });
      setModalConfigs({
        title: "Edit Product",
        onOk: async () => {
          setModalConfigs((prev) => ({ ...prev, confirmLoading: true }));
          await handleSubmit(onSubmitEdit, Promise.reject)()
            .then(modalApi.close)
            .finally(() => {
              setModalConfigs((prev) => ({ ...prev, confirmLoading: false }));
            });
        },
        children: <ProductForm />,
        afterClose: () => {
          setModalConfigs({ children: null });
          resetFormToDefault();
        },
      });
      modalApi.open();
    },
    [handleSubmit, modalApi, onSubmitEdit, reset, resetFormToDefault],
  );

  const handleRenewProductClick = useCallback(
    (props: ProductType) => {
      const images = parseServerProductImages(props.images);

      reset({ ...props, images, terms: { ...props.terms, end_date: null } });
      setModalConfigs({
        title: "Renew Product",
        onOk: async () => {
          setModalConfigs((prev) => ({ ...prev, confirmLoading: true }));
          await handleSubmit(onSubmit, Promise.reject)()
            .then(modalApi.close)
            .finally(() => {
              setModalConfigs((prev) => ({ ...prev, confirmLoading: false }));
            });
        },
        children: <ProductForm />,
        afterClose: () => {
          setModalConfigs({ children: null });
          resetFormToDefault();
        },
      });
      modalApi.open();
    },
    [handleSubmit, modalApi, reset, resetFormToDefault, onSubmit],
  );

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

  const handleFiltersClick = () => {
    let filters: { [key: string]: string } = {};
    setModalConfigs({
      title: "Filters",
      onOk: async () => {
        if (!_isEmpty(filters)) {
          const query = filtersService.fromJsonToQuery(filters);
          router.push(`/my-products?${query}`);
        }

        modalApi.close();
      },
      children: (
        <Filters
          defaultValues={urlFilters}
          onChange={(key: string, values: string[]) => {
            filters[key] = values.map((item) => item.toLowerCase()).join();
          }}
        />
      ),
      afterClose: () => {
        setModalConfigs({ children: null });
        resetFormToDefault();
      },
      width: 600,
    });
    modalApi.open();
  };

  const parseServerProductImages = (
    images: ProductType["images"],
  ): UploadFile[] | null => {
    return (
      images?.map(({ src: { url }, meta: { public_id } }) => ({
        uid: public_id,
        name: public_id,
        status: "done",
        url,
      })) || null
    );
  };

  const productsMemo = useMemo(() => {
    return products?.map(({ ...props }) => {
      return (
        <ProductCard
          onRenew={() => handleRenewProductClick(props)}
          onEdit={() => handleEditProductClick(props)}
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
    handleRenewProductClick,
    handleEditProductClick,
    handlePublishProductClick,
    onDeleteItem,
  ]);

  return (
    <div className={"grid grid-cols-1 gap-[20px]"}>
      <FormProvider {...formFactory}>{ModalRoot(modalConfigs)}</FormProvider>
      <ProductsBar
        onFiltersClick={handleFiltersClick}
        onAddProductClick={handleAddProductClick}
      />
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
    </div>
  );
};

export default Products;
