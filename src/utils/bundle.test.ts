import { describe, expect, it } from "vitest";
import { plans } from "../data/plans";
import { products } from "../data/products";
import {
  calculateBundleTotals,
  createConfigurationKey,
  getSelectedItems,
} from "./bundle";

describe("bundle calculations", () => {
  it("keeps selected variants as separate review lines", () => {
    const variantProduct = products[0];

    if (variantProduct.type !== "variant") {
      throw new Error("Expected the first fixture to have variants.");
    }

    const configuredProducts = [
      {
        ...variantProduct,
        variants: variantProduct.variants.map((variant) => ({
          ...variant,
          quantity:
            variant.id === "white"
              ? 2
              : variant.id === "black"
                ? 1
                : 0,
        })),
      },
    ];

    const items = getSelectedItems(configuredProducts);

    expect(items).toHaveLength(2);
    expect(items.map(({ name, quantity }) => ({ name, quantity }))).toEqual([
      { name: "Wyze Cam v4 - White", quantity: 2 },
      { name: "Wyze Cam v4 - Black", quantity: 1 },
    ]);
  });

  it("calculates product and plan discounts dynamically", () => {
    const items = getSelectedItems(products);
    const totals = calculateBundleTotals(items, plans[0]);

    expect(totals.total).toBeCloseTo(209.87);
    expect(totals.oldTotal).toBeCloseTo(260.79);
    expect(totals.savings).toBeCloseTo(50.92);
  });

  it("changes the configuration key when a quantity changes", () => {
    const originalKey = createConfigurationKey(
      products,
      "cam-unlimited",
    );
    const firstProduct = products[0];

    if (firstProduct.type !== "variant") {
      throw new Error("Expected the first fixture to have variants.");
    }

    const updatedProducts = [
      {
        ...firstProduct,
        variants: firstProduct.variants.map((variant) =>
          variant.id === "white"
            ? { ...variant, quantity: variant.quantity + 1 }
            : variant,
        ),
      },
      ...products.slice(1),
    ];

    expect(
      createConfigurationKey(updatedProducts, "cam-unlimited"),
    ).not.toBe(originalKey);
  });
});
