import { describe, expect, it } from "vitest";
import { products } from "../data/products";
import {
  getProductTotalQuantity,
  getSelectedVariant,
} from "./product";

describe("product helpers", () => {
  it("reads the active variant without discarding other quantities", () => {
    const product = products[1];

    if (product.type !== "variant") {
      throw new Error("Expected a variant product.");
    }

    expect(getSelectedVariant(product).id).toBe("white");
    expect(getProductTotalQuantity(product)).toBe(2);
  });

  it("reads a simple product quantity", () => {
    const product = products[5];
    expect(getProductTotalQuantity(product)).toBe(2);
  });
});
