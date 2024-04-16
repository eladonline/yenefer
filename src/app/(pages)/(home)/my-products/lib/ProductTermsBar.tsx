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
              validate: (
                minPrice: number,
                {
                  price,
                  terms: {
                    discount_each_buyer: {
                      value: discountEachBuyerValue,
                      unit: discountEachBuyerUnit,
                    },
                    quantity,
                  },
                }: ProductFormType,
              ) => {
                if (
                  !price ||
                  !discountEachBuyerValue ||
                  !discountEachBuyerUnit ||
                  !quantity
                )
                  return;
                const priceDecimal = new Decimal(price);
                const minPriceDecimal = new Decimal(minPrice);

                if (discountEachBuyerUnit !== "percentage") {
                  const discountDecimal = new Decimal(discountEachBuyerValue);

                  if (
                    priceDecimal
                      .minus(discountDecimal)
                      .lessThan(minPriceDecimal)
                  )
                    return `Price - Discount is lower/equal to ${priceDecimal.minus(discountDecimal)}`;

                  if (!minPriceDecimal.modulo(discountDecimal).isZero())
                    return `Price with Discount will never be ${minPrice}`;

                  if (priceDecimal.lessThanOrEqualTo(minPriceDecimal))
                    return `Minimum price should be lower then ${price}`;

                  if (
                    priceDecimal
                      .minus(discountDecimal.times(quantity))
                      .gt(minPriceDecimal)
                  )
                    return `Price with Discount and quantity will never be ${minPrice}`;
                }

                if (discountEachBuyerUnit === "percentage") {
                  const discountDecimal = new Decimal(discountEachBuyerValue);

                  const discountAsInteger = new Decimal(
                    discountDecimal.dividedBy(100).times(priceDecimal),
                  );

                  const priceAfterDiscount =
                    priceDecimal.minus(discountAsInteger);

                  if (priceAfterDiscount.lt(minPriceDecimal))
                    return `Price - Discount should be higher/equal ${minPrice}`;

                  if (!minPriceDecimal.modulo(discountAsInteger).isZero())
                    return `Price - Discount * Buyers will never equal to ${minPrice}`;

                  if (
                    priceDecimal
                      .minus(discountAsInteger.times(quantity))
                      .gt(minPriceDecimal)
                  )
                    return `Price - Discount * Quantity will never be ${minPrice}`;
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
