import { ProductFormType } from "@/types/apis/usersData";
import Decimal from "decimal.js";

export const validateMinPrice = (
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
  if (!price || !discountEachBuyerValue || !discountEachBuyerUnit || !quantity)
    return;
  const priceDecimal = new Decimal(price);
  const minPriceDecimal = new Decimal(minPrice);

  if (discountEachBuyerUnit !== "percentage") {
    const discountDecimal = new Decimal(discountEachBuyerValue);

    if (priceDecimal.minus(discountDecimal).lessThan(minPriceDecimal))
      return `Price - Discount is lower/equal to ${priceDecimal.minus(discountDecimal)}`;

    if (!minPriceDecimal.modulo(discountDecimal).isZero())
      return `Price with Discount will never be ${minPrice}`;

    if (priceDecimal.lessThanOrEqualTo(minPriceDecimal))
      return `Minimum price should be lower then ${price}`;

    if (priceDecimal.minus(discountDecimal.times(quantity)).gt(minPriceDecimal))
      return `Price with Discount and quantity will never be ${minPrice}`;
  }

  if (discountEachBuyerUnit === "percentage") {
    const discountDecimal = new Decimal(discountEachBuyerValue);

    const discountAsInteger = new Decimal(
      discountDecimal.dividedBy(100).times(priceDecimal),
    );

    const priceAfterDiscount = priceDecimal.minus(discountAsInteger);

    if (priceAfterDiscount.lt(minPriceDecimal))
      return `Price - Discount should be higher/equal ${minPrice}`;

    if (!minPriceDecimal.modulo(discountAsInteger).isZero())
      return `Price - Discount * Buyers will never equal to ${minPrice}`;

    if (
      priceDecimal.minus(discountAsInteger.times(quantity)).gt(minPriceDecimal)
    )
      return `Price - Discount * Quantity will never be ${minPrice}`;
  }
};
