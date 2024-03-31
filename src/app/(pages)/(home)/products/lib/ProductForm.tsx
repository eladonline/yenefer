import React from "react";
import {
  ControlledInput,
  ControlledInputNumber,
  ControlledSelect,
  ControlledTextArea,
} from "@/utils/hooks/useForm/ControlledInputs";
import { useFormContext } from "react-hook-form";
import Field from "@/app/components/decorators/form/Field";
import config from "./config.json";

const ProductForm = () => {
  const { control, getValues } = useFormContext();
  const categories = config.categories.map((id) => ({
    value: id.toLocaleLowerCase(),
    label: id,
  }));
  return (
    <div className={"flex flex-col gap-5"}>
      <div className={"grid grid-cols-[400px_400px] gap-5"}>
        <Field label={{ text: "Name" }}>
          <ControlledInput name={"name"} control={control} />
        </Field>
        <Field label={{ text: "Category" }}>
          <ControlledSelect
            options={categories}
            name={"category"}
            control={control}
          />
        </Field>
      </div>
      <Field label={{ text: "Description" }}>
        <ControlledTextArea name={"description"} control={control} />
      </Field>
      <Field label={{ text: "Price" }}>
        <ControlledInputNumber name={"price"} control={control} />
      </Field>
    </div>
  );
};
export default ProductForm;
