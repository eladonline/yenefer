import React, { FC } from "react";
import { useFormContext } from "react-hook-form";
import Field from "@/app/components/decorators/form/Field";
import { ControlledInputNumber } from "@/utils/hooks/useForm/ControlledInputs";
import _get from "lodash/get";

const ProductTermsBar: FC = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={"flex flex-col gap-2"}>
      <div className={"flex gap-2"}>
        <Field required label={{ text: "Min Price" }}>
          <ControlledInputNumber
            rules={{ required: "Field Required" }}
            name={"terms.min_price"}
            min={0}
            control={control}
            status={_get(errors, "terms.min_price") && "error"}
          />
        </Field>

        <Field required label={{ text: "Discount Per Buyer" }}>
          <ControlledInputNumber
            rules={{ required: "Field Required" }}
            name={"terms.discount_each_buyer"}
            min={0}
            control={control}
            status={_get(errors, "terms.discount_each_buyer") && "error"}
          />
        </Field>
      </div>
      <div className={"flex gap-2"}>
        <Field required label={{ text: "End Date" }}>
          <ControlledInputNumber
            rules={{ required: "Field Required" }}
            name={"terms.end_date"}
            min={0}
            control={control}
            status={_get(errors, "terms.end_date") && "error"}
          />
        </Field>

        <Field required label={{ text: "Max Buyers Per Group" }}>
          <ControlledInputNumber
            rules={{ required: "Field Required" }}
            name={"terms.max_buyers"}
            min={0}
            control={control}
            status={_get(errors, "terms.max_buyers") && "error"}
          />
        </Field>
      </div>
    </div>
  );
};
export default ProductTermsBar;
