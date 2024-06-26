import React from "react";
import {
  ControlledInput,
  ControlledInputNumber,
  ControlledSelect,
  ControlledTextArea,
} from "@/utils/hooks/useForm/ControlledInputs";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import Field from "@/app/components/decorators/form/Field";
import config from "./config.json";
import ProductTermsBar from "@/app/(pages)/(home)/my-products/lib/ProductTermsBar";
import _get from "lodash/get";
import { productDefaultValues } from "@/app/(pages)/(home)/my-products/lib/useProduct";
import Upload from "@/app/components/Inputs/Upload";

const categories = config.categories.map((id) => ({
  value: id.toLocaleLowerCase(),
  label: id,
}));

const ProductForm = () => {
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext();
  const price = useWatch({ control, name: "price" });
  const { append } = useFieldArray({ control, name: "imagesToRemove" });

  return (
    <div className={"flex flex-col gap-5"}>
      <div className={"grid grid-cols-[400px_400px] gap-5"}>
        <Field required label={{ text: "Name" }}>
          <ControlledInput
            rules={{ required: "Field Required" }}
            name={"name"}
            control={control}
            status={_get(errors, "name") && "error"}
          />
        </Field>
        <Field required label={{ text: "Category" }}>
          <ControlledSelect
            rules={{ required: "Field Required" }}
            options={categories}
            name={"category"}
            control={control}
            placeholder={"Category"}
            status={_get(errors, "category") && "error"}
          />
        </Field>
      </div>
      <Field label={{ text: "Description" }}>
        <ControlledTextArea name={"description"} control={control} />
      </Field>

      <div className={"flex gap-5 "}>
        <div className={"flex flex-cold gap-5 min-w-[406px]"}>
          <Field required label={{ text: "Price" }}>
            <ControlledInputNumber
              rules={{ required: "Field Required" }}
              min={0}
              name={"price"}
              control={control}
              status={_get(errors, "price") && "error"}
              onChange={() => setValue("terms", productDefaultValues.terms)}
            />
          </Field>
          <ProductTermsBar disabled={price < 1} />
        </div>
        <div className={"w-[400px]"}>
          <Field label={{ text: "Images" }}>
            <Upload
              name={"images"}
              control={control}
              onRemove={({ name }: { name: string }) => append(name)}
            />
          </Field>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
