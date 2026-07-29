import type { Product } from "../types/Product";

const STORAGE_KEY = "wyze-bundle-configuration";

interface SavedProduct {
  id: number;
  selectedVariantId?: string;
  quantity?: number;
  variantQuantities?: Record<string, number>;
}

interface SavedConfiguration {
  products: SavedProduct[];
  selectedPlanId: string | null;
}

interface RestoredConfiguration {
  products: Product[];
  selectedPlanId: string | null;
}

export interface SaveResult {
  success: boolean;
}

const isSafeQuantity = (value: unknown): value is number =>
  typeof value === "number" &&
  Number.isInteger(value) &&
  value >= 0;

export function saveSystem(
  products: Product[],
  selectedPlanId: string | null,
): SaveResult {
  const configuration: SavedConfiguration = {
    products: products.map((product) => {
      if (product.type === "simple") {
        return {
          id: product.id,
          quantity: product.quantity,
        };
      }

      return {
        id: product.id,
        selectedVariantId: product.selectedVariantId,
        variantQuantities: Object.fromEntries(
          product.variants.map((variant) => [
            variant.id,
            variant.quantity,
          ]),
        ),
      };
    }),
    selectedPlanId,
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(configuration));
    return { success: true };
  } catch {
    return { success: false };
  }
}

export function restoreSystem(
  initialProducts: Product[],
  validPlanIds: string[],
): RestoredConfiguration | null {
  try {
    const savedValue = localStorage.getItem(STORAGE_KEY);

    if (savedValue === null) {
      return null;
    }

    const parsed = JSON.parse(savedValue) as Partial<SavedConfiguration>;

    if (!Array.isArray(parsed.products)) {
      return null;
    }

    const savedProducts = parsed.products.filter(
      (product): product is SavedProduct =>
        typeof product === "object" &&
        product !== null &&
        typeof product.id === "number",
    );

    const products = initialProducts.map((product) => {
      const savedProduct = savedProducts.find(
        (candidate) => candidate.id === product.id,
      );

      if (savedProduct === undefined) {
        return product;
      }

      if (product.type === "simple") {
        return isSafeQuantity(savedProduct.quantity)
          ? { ...product, quantity: savedProduct.quantity }
          : product;
      }

      const selectedVariantExists = product.variants.some(
        (variant) =>
          variant.id === savedProduct.selectedVariantId,
      );

      return {
        ...product,
        selectedVariantId: selectedVariantExists
          ? savedProduct.selectedVariantId!
          : product.selectedVariantId,
        variants: product.variants.map((variant) => {
          const quantity =
            savedProduct.variantQuantities?.[variant.id];

          return isSafeQuantity(quantity)
            ? { ...variant, quantity }
            : variant;
        }),
      };
    });

    const savedPlanId =
      typeof parsed.selectedPlanId === "string" &&
      validPlanIds.includes(parsed.selectedPlanId)
        ? parsed.selectedPlanId
        : null;

    return {
      products,
      selectedPlanId: savedPlanId,
    };
  } catch {
    return null;
  }
}
