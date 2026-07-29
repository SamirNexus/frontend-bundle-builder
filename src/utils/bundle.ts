import type { Plan } from "../types/Plan";
import type { Product } from "../types/Product";

export interface SelectedBundleItem {
  key: string;
  productId: number;
  variantId?: string;
  category: Product["category"];
  name: string;
  image: string;
  quantity: number;
  price: number;
  oldPrice?: number;
}

export function getSelectedItems(
  products: Product[],
): SelectedBundleItem[] {
  return products.flatMap((product): SelectedBundleItem[] => {
    if (product.type === "simple") {
      return product.quantity > 0
        ? [{
            key: String(product.id),
            productId: product.id,
            category: product.category,
            name: product.name,
            image: product.image,
            quantity: product.quantity,
            price: product.price,
            oldPrice: product.oldPrice,
          }]
        : [];
    }

    return product.variants
      .filter((variant) => variant.quantity > 0)
      .map((variant) => ({
        key: `${product.id}-${variant.id}`,
        productId: product.id,
        variantId: variant.id,
        category: product.category,
        name: `${product.name} - ${variant.name}`,
        image: variant.image,
        quantity: variant.quantity,
        price: variant.price,
        oldPrice: variant.oldPrice,
      }));
  });
}

export function calculateBundleTotals(
  items: SelectedBundleItem[],
  selectedPlan: Plan | null,
) {
  const productsTotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const productsOldTotal = items.reduce(
    (sum, item) =>
      sum + (item.oldPrice ?? item.price) * item.quantity,
    0,
  );
  const total = productsTotal + (selectedPlan?.price ?? 0);
  const oldTotal =
    productsOldTotal +
    (selectedPlan?.oldPrice ?? selectedPlan?.price ?? 0);

  return {
    total,
    oldTotal,
    savings: Math.max(0, oldTotal - total),
  };
}

export function createConfigurationKey(
  products: Product[],
  selectedPlanId: string | null,
) {
  return JSON.stringify({
    products: products.map((product) =>
      product.type === "simple"
        ? { id: product.id, quantity: product.quantity }
        : {
            id: product.id,
            selectedVariantId: product.selectedVariantId,
            variants: product.variants.map((variant) => ({
              id: variant.id,
              quantity: variant.quantity,
            })),
          },
    ),
    selectedPlanId,
  });
}
