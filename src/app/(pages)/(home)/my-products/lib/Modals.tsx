import { Modal } from "antd/lib";
import React, { FC, PropsWithChildren, useEffect, useState } from "react";
import ProductForm from "@/app/(pages)/(home)/my-products/lib/ProductForm";
import { useProduct } from "@/app/(pages)/(home)/my-products/lib/useProduct";
import { ProductFormType, ProductType } from "@/types/apis/user/data";
import _isEmpty from "lodash/isEmpty";
import filtersService from "@/utils/Filters";
import { useRouter } from "next/navigation";
import Filters from "@/app/components/bars/products/lib/Filters";

export const EditOrRenewModal: FC<{
  payload: ProductType;
  children: string;
}> = ({ payload, children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {
    resetFormToDefault,
    formFactory,
    onSubmitEdit,
    onSubmit,
    parseServerProductImages,
  } = useProduct();
  const { handleSubmit, reset, formState } = formFactory;
  const isRenewMode = children === "Renew";

  const handleAction = () => {
    const { images, ...fields } = payload;
    const nextResetValues: ProductFormType = {
      ...fields,
    };

    if (images) {
      nextResetValues.images = parseServerProductImages(images);
    }

    if (isRenewMode) {
      nextResetValues.terms = { ...payload.terms, end_date: null };
    }

    reset(nextResetValues);

    setIsOpen(true);
  };

  useEffect(() => {
    if (isOpen) setIsOpen(false);
  }, [formState.isSubmitSuccessful]);

  return (
    <>
      <Modal
        title={`${children} Product`}
        open={isOpen}
        afterClose={() => {
          resetFormToDefault();
        }}
        onOk={async () => {
          await handleSubmit(isRenewMode ? onSubmit : onSubmitEdit)();
        }}
        onCancel={() => setIsOpen(false)}
        width={"max-content"}
        confirmLoading={formState.isSubmitting}
      >
        <ProductForm />
      </Modal>
      <div
        className={"font-bold text-blue-500 hover:text-blue-300 cursor-pointer"}
        onClick={handleAction}
      >
        {children}
      </div>
    </>
  );
};

export const NewProductModal: FC<PropsWithChildren> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { resetFormToDefault, formFactory, onSubmit } = useProduct();
  const { handleSubmit, formState } = formFactory;

  useEffect(() => {
    if (isOpen) setIsOpen(false);
  }, [formState.isSubmitSuccessful]);

  return (
    <>
      <Modal
        title={`Add New Product`}
        open={isOpen}
        afterClose={() => {
          resetFormToDefault();
        }}
        onOk={async () => {
          await handleSubmit(onSubmit)();
        }}
        onCancel={() => setIsOpen(false)}
        width={"max-content"}
        confirmLoading={formState.isSubmitting}
      >
        <ProductForm />
      </Modal>
      <div onClick={() => setIsOpen(true)}>{children}</div>
    </>
  );
};

export const FiltersModal: FC<PropsWithChildren> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const { urlFilters } = useProduct();
  let filters: { [key: string]: string } = {};

  return (
    <>
      <Modal
        title={`Filters`}
        open={isOpen}
        onOk={async () => {
          if (!_isEmpty(filters)) {
            const query = filtersService.fromJsonToQuery(filters);
            router.push(`/my-products?${query}`);
          }

          setIsOpen(false);
        }}
        onCancel={() => setIsOpen(false)}
        width={600}
      >
        <Filters
          defaultValues={urlFilters}
          onChange={(key: string, values: string[]) => {
            filters[key] = values.map((item) => item.toLowerCase()).join();
          }}
        />
      </Modal>
      <div
        className={"font-bold text-blue-500 hover:text-blue-300 cursor-pointer"}
        onClick={() => setIsOpen(true)}
      >
        {children}
      </div>
    </>
  );
};
