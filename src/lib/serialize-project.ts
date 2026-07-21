import { decimalToNumber } from "@/lib/currency";

type CategoryWithPrices = {
  price: { toString(): string } | number;
  priceTo?: { toString(): string } | number | null;
};

type SerializedCategory<T extends CategoryWithPrices> = Omit<
  T,
  "price" | "priceTo"
> & {
  price: number;
  priceTo: number | null;
};

/** Convert Prisma Decimal prices to plain numbers for Client Components. */
export function serializeCategoryPrices<T extends CategoryWithPrices>(
  category: T,
): SerializedCategory<T> {
  return {
    ...category,
    price: decimalToNumber(category.price) ?? 0,
    priceTo:
      category.priceTo != null ? decimalToNumber(category.priceTo) : null,
  };
}

export function serializeProjectCategories<
  T extends { categories: CategoryWithPrices[] },
>(
  project: T,
): Omit<T, "categories"> & {
  categories: SerializedCategory<T["categories"][number]>[];
} {
  const { categories, ...projectData } = project;

  return {
    ...projectData,
    categories: categories.map((category) =>
      serializeCategoryPrices(
        category as T["categories"][number],
      ),
    ),
  };
}
