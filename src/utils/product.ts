import type {
  ProductWithVariants,
  ProductVariant,
  Product,
} from "../types/Product";

export function getSelectedVariant(
  product: ProductWithVariants,
): ProductVariant {
  const selectedVariant = product.variants.find(
    (variant) =>
      variant.id === product.selectedVariantId,
  );

  if (!selectedVariant) {
    throw new Error(
      `Selected variant "${product.selectedVariantId}" was not found for product "${product.name}".`,
    );
  }

  return selectedVariant;
}

export function getProductTotalQuantity(
  product: Product,
): number {
  if (product.type === "simple") {
    return product.quantity;
  }

  return product.variants.reduce(
    (total, variant) =>
      total + variant.quantity,
    0,
  );
}
