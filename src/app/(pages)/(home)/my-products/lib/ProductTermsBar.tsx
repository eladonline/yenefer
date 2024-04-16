import React, { FC } from "react";
import { useFormContext } from "react-hook-form";
import Field from "@/app/components/decorators/form/Field";
import {
  ControlledDatePicker,
  ControlledInputNumber,
  ControlledRadioGroup,
} from "@/utils/hooks/useForm/ControlledInputs";
import _get from "lodash/get";
import dayjs from "dayjs";
import { validateMinPrice } from "@/app/(pages)/(home)/my-products/lib/validations";

const options = [
  { label: "%", value: "percentage" },
  { label: "₪", value: "nis" },
];

const ProductTermsBar: FC<{ disabled: boolean }> = ({ disabled }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={"flex flex-col gap-2"}>
      <div className={"flex gap-4"}>
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
          <div className={"flex items-center gap-3"}>
            <ControlledInputNumber
              disabled={disabled}
              rules={{ required: "Field Required" }}
              name={"terms.discount_each_buyer.value"}
              min={0}
              control={control}
              status={_get(errors, "terms.discount_each_buyer") && "error"}
            />
            <ControlledRadioGroup
              disabled={disabled}
              options={options}
              name={"terms.discount_each_buyer.unit"}
              control={control}
              optionType="button"
              size={"small"}
            />
          </div>
        </Field>

        <Field
          required
          label={{
            text: "Min Price",
            tooltip: {
              title:
                "Minimum Price suggest the lowest price after the discount. if Min price is exceeded and buyers keep sign to the group the price will not reduce.",
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
              validate: validateMinPrice,
            }}
            name={"terms.min_price"}
            min={0}
            control={control}
            status={_get(errors, "terms.min_price") && "error"}
          />
        </Field>
      </div>
      <div className={"flex gap-4"}>
        <Field
          required
          label={{ text: "Quantity" }}
          error={{
            text: _get(errors, "terms.quantity.message", "") as string,
          }}
        >
          <ControlledInputNumber
            disabled={disabled}
            rules={{
              required: "Field Required",
            }}
            name={"terms.quantity"}
            min={0}
            step={1}
            control={control}
            status={_get(errors, "terms.quantity") && "error"}
          />
        </Field>

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
      </div>
    </div>
  );
};

export default ProductTermsBar;
