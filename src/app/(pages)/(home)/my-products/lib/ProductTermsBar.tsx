import React, { FC } from "react";
import { useFormContext } from "react-hook-form";
import Field from "@/app/components/decorators/form/Field";
import {
  ControlledDatePicker,
  ControlledInputNumber,
} from "@/utils/hooks/useForm/ControlledInputs";
import _get from "lodash/get";
import dayjs from "dayjs";

const ProductTermsBar: FC<{ disabled: boolean }> = ({ disabled }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={"flex flex-col gap-2"}>
      <div className={"flex gap-3"}>
        <Field
          required
          label={{
            text: "Min Price",
            tooltip: {
              title:
                "Minimum Price suggest the lowest price for the discount. In other words maximum discount (calculated by the (Price - Discount * Buyers))",
            },
          }}
          error={{
            text: _get(errors, "terms.min_price.message", "") as string,
          }}
        >
          <ControlledInputNumber
            disabled={disabled}
            rules={{
              required: "Field Required",
              validate: (minPrice: number, { price }: { price: number }) => {
                if (minPrice >= price)
                  return "Minimum price should be lower then the price";
              },
            }}
            name={"terms.min_price"}
            min={0}
            control={control}
            status={_get(errors, "terms.min_price") && "error"}
          />
        </Field>

        <Field
          required
          label={{ text: "Discount Per Buyer" }}
          error={{
            text: _get(
              errors,
              "terms.discount_each_buyer.message",
              "",
            ) as string,
          }}
        >
          <ControlledInputNumber
            disabled={disabled}
            rules={{ required: "Field Required" }}
            name={"terms.discount_each_buyer"}
            min={0}
            control={control}
            status={_get(errors, "terms.discount_each_buyer") && "error"}
          />
        </Field>
      </div>
      <div className={"flex gap-2"}>
        <Field
          required
          label={{ text: "End Date" }}
          error={{
            text: _get(errors, "terms.end_date.message", "") as string,
          }}
        >
          <ControlledDatePicker
            disabled={disabled}
            rules={{ required: "Field Required" }}
            name={"terms.end_date"}
            minDate={dayjs()}
            control={control}
            showTime={{ format: "HH:mm" }}
            format="DD-MM-YYYY HH:mm"
            status={_get(errors, "terms.end_date") && "error"}
          />
        </Field>

        <Field
          required
          label={{ text: "Max Buyers Per Group" }}
          error={{
            text: _get(errors, "terms.max_buyers.message", "") as string,
          }}
        >
          <ControlledInputNumber
            disabled={disabled}
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
