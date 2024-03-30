import React from "react";
import ControlledInput from "@/utils/hooks/useForm/ControlledInputs";
import { useFormContext } from "react-hook-form";

const ProductForm = () => {
  const { control, getValues } = useFormContext();
  console.log(getValues());
  return (
    <div className={"grid grid-cols-[400px_400px] gap-12"}>
      <ControlledInput name={"name"} control={control} />
      <ControlledInput name={"price"} control={control} />
    </div>
  );
};
export default ProductForm;
