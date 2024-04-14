import React, { FC } from "react";
import { useFormContext } from "react-hook-form";
import Field from "@/app/components/decorators/form/Field";
import {
  ControlledInput,
  ControlledInputNumber,
} from "@/utils/hooks/useForm/ControlledInputs";

const ProductTermsBar: FC = () => {
  const { control } = useFormContext();
  return (
    <div className={"flex gap-2"}>
      <Field label={{ text: "Min Price" }}>
        <ControlledInputNumber name={"min-price"} control={control} />
      </Field>

      <Field label={{ text: "Discount Per Buyer" }}>
        <ControlledInputNumber name={"discount_each_buyer"} control={control} />
      </Field>

      <Field label={{ text: "End Date" }}>
        <ControlledInputNumber name={"end-date"} control={control} />
      </Field>

      <Field label={{ text: "Max Buyers Per Group" }}>
        <ControlledInputNumber name={"max-buyers"} control={control} />
      </Field>
    </div>
  );
};
export default ProductTermsBar;
