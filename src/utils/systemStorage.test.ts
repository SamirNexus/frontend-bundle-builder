import { beforeEach, describe, expect, it, vi } from "vitest";
import { plans } from "../data/plans";
import { products } from "../data/products";
import { restoreSystem, saveSystem } from "./systemStorage";

const validPlanIds = plans.map((plan) => plan.id);

describe("system persistence", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("restores quantities, active variants, and a valid plan", () => {
    expect(saveSystem(products, "cam-unlimited")).toEqual({
      success: true,
    });

    const restored = restoreSystem(products, validPlanIds);

    expect(restored?.selectedPlanId).toBe("cam-unlimited");
    expect(restored?.products).toEqual(products);
  });

  it("rejects an unknown saved plan id", () => {
    localStorage.setItem(
      "wyze-bundle-configuration",
      JSON.stringify({
        products: [],
        selectedPlanId: "retired-plan",
      }),
    );

    expect(
      restoreSystem(products, validPlanIds)?.selectedPlanId,
    ).toBeNull();
  });

  it("falls back safely when saved JSON is corrupt", () => {
    localStorage.setItem(
      "wyze-bundle-configuration",
      "{not-json",
    );

    expect(restoreSystem(products, validPlanIds)).toBeNull();
  });

  it("reports a storage write failure", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new DOMException("Storage unavailable");
    });

    expect(saveSystem(products, "cam-unlimited")).toEqual({
      success: false,
    });
  });
});
