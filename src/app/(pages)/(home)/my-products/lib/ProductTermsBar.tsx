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
import { ProductFormType } from "@/types/apis/usersData";
import Decimal from "decimal.js";

const options = [
  { label: "%", value: "percentage" },
  { label: "NIS", value: "nis" },
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
              validate: (
                minPrice: number,
                {
                  price,
                  terms: {
                    discount_each_buyer: {
                      value: discountEachBuyerValue,
                      unit: discountEachBuyerUnit,
                    },
                    max_buyers,
                  },
                }: ProductFormType,
              ) => {
                if (
                  !price ||
                  !discountEachBuyerValue ||
                  !discountEachBuyerUnit ||
                  !max_buyers
                )
                  return;

                if (discountEachBuyerUnit !== "percentage") {
                  if (minPrice % discountEachBuyerValue)
                    return `Discount * Max group members cannot be equal to ${minPrice}`;

                  if (minPrice >= price)
                    return `Minimum price should be lower then ${price}`;
                }

                if (discountEachBuyerUnit === "percentage") {
                  const percentageOfPrice = new Decimal(
                    discountEachBuyerValue / 100,
                  );
                  const priceAfterDiscount =
                    price -
                    Number(percentageOfPrice.times(max_buyers).times(price));

                  if (priceAfterDiscount !== minPrice)
                    return `Price after max discount is ${priceAfterDiscount} it should equal to ${minPrice}`;
                }
              },
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
          label={{ text: "Max Buyers" }}
          error={{
            text: _get(errors, "terms.max_buyers.message", "") as string,
          }}
        >
          <ControlledInputNumber
            disabled={disabled}
            rules={{
              required: "Field Required",
              validate: (
                max_buyers: number,
                {
                  price,
                  terms: {
                    min_price,
                    discount_each_buyer: {
                      value: discount_each_buyer,
                      unit: discount_each_buyerUnit,
                    },
                  },
                }: ProductFormType,
              ) => {
                if (!price || !discount_each_buyer || !min_price) return;
                if (price - max_buyers * discount_each_buyer > min_price)
                  return `Discount * Max buyers will never reach to ${min_price}`;
              },
            }}
            name={"terms.max_buyers"}
            min={0}
            control={control}
            status={_get(errors, "terms.max_buyers") && "error"}
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
