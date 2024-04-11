"use client";
import React, { ReactElement, FC } from "react";
import QueryClientProvider from "@/utils/Providers/QueryClientProvider";
import { useProduct } from "@/app/(pages)/(home)/products/lib/useProduct";
import Menu from "@/app/(pages)/(home)/products/lib/Menu";
import { FormProvider } from "react-hook-form";
import ProductForm from "@/app/(pages)/(home)/products/lib/ProductForm";
import { useModal } from "@/utils/hooks/useModal/useModal";
import ItemCard from "@/app/(pages)/(home)/products/lib/ItemCard";

const Products: FC = () => {
  const { products, formFactory, onSubmit, resetFormToDefault, onSubmitEdit } =
    useProduct();
  const [ModalRoot, modalApi] = useModal();
  const {
    formState: { isSubmitting },
    handleSubmit,
    reset,
  } = formFactory;

  const productsEl: ReactElement[] | undefined = products?.map(
    ({ ...props }) => {
      return (
        <ItemCard
          onEdit={() => {
            reset({ ...props });
            modalApi.open();
          }}
          key={props._id}
          {...props}
        />
      );
    },
  );

  return (
    <div className={"grid grid-cols-1 gap-[20px]"}>
      <FormProvider {...formFactory}>
        {ModalRoot({
          title: "Product",
          onOk: async () => {
            await handleSubmit((values) => {
              values._id ? onSubmitEdit(values) : onSubmit(values);
            })();
            modalApi.close();
          },
          confirmLoading: isSubmitting,
          children: <ProductForm />,
          afterClose: resetFormToDefault,
        })}
      </FormProvider>
      <Menu onClickAddProduct={modalApi.open} />
      <div className={"p-5"}>
        <ul className={"flex flex-wrap gap-3"}>{productsEl}</ul>
      </div>
    </div>
  );
};
export default Products;
