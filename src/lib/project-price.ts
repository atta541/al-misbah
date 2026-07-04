import { decimalToNumber, formatMoneyRange } from "@/lib/currency";

type CategoryPrice = {
  price: { toString(): string };
  priceTo?: { toString(): string } | null;
  isActive: boolean;
};

export function getProjectPriceBounds(categories: CategoryPrice[]) {
  const active = categories.filter((category) => category.isActive);
  if (active.length === 0) return null;

  const mins = active
    .map((category) => decimalToNumber(category.price))
    .filter((value): value is number => value != null);
  const maxs = active
    .map((category) =>
      decimalToNumber(category.priceTo ?? category.price),
    )
    .filter((value): value is number => value != null);

  if (mins.length === 0 || maxs.length === 0) return null;

  return {
    min: Math.min(...mins),
    max: Math.max(...maxs),
  };
}

export function getProjectPriceLabel(
  categories: CategoryPrice[],
  currency = "PKR",
) {
  const bounds = getProjectPriceBounds(categories);
  if (!bounds) return null;
  return formatMoneyRange(bounds.min, bounds.max, currency);
}

export function formatCategoryPrice(
  price: { toString(): string },
  priceTo: { toString(): string } | null | undefined,
  currency = "PKR",
) {
  const min = decimalToNumber(price);
  const max = decimalToNumber(priceTo ?? price);
  if (min == null || max == null) return null;
  return formatMoneyRange(min, max, currency);
}
