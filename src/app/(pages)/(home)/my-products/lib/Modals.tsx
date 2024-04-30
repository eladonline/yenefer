import { Modal } from "antd/lib";
import React, { FC, PropsWithChildren, useState } from "react";
import ProductForm from "@/app/(pages)/(home)/my-products/lib/ProductForm";
import { useProduct } from "@/app/(pages)/(home)/my-products/lib/useProduct";
import { ProductFormType, ProductType } from "@/types/apis/user/data";
import _isEmpty from "lodash/isEmpty";

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
          if (formState.isValid) setIsOpen(false);
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
