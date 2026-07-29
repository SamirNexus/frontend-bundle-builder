import { useState } from "react";

import { products as initialProducts } from "../../data/products";
import { plans } from "../../data/plans";
import type { Product } from "../../types/Product";
import {
  restoreSystem,
  saveSystem,
} from "../../utils/systemStorage";

import BundleBuilder from "../bundle/BundleBuilder";
import Summary from "../review/Summary";

import "../../styles/layout/Main.css";

function Main() {
  const [savedSystem] = useState(() =>
    restoreSystem(
      initialProducts,
      plans.map((plan) => plan.id),
    ),
  );
  const [products, setProducts] =
    useState<Product[]>(
      () => savedSystem?.products ?? initialProducts,
    );
  const [selectedPlanId, setSelectedPlanId] =
    useState<string | null>(
      () => savedSystem?.selectedPlanId ?? "cam-unlimited",
    );

  const handleSaveSystem = () =>
    saveSystem(products, selectedPlanId).success;

  const changeQuantity = (
    productId: number,
    delta: 1 | -1,
    variantId?: string,
  ) => {
    setProducts((currentProducts) =>
      currentProducts.map((product) => {
        if (product.id !== productId) {
          return product;
        }

        if (product.type === "variant") {
          const targetVariantId =
            variantId ?? product.selectedVariantId;

          if (
            !product.variants.some(
              (variant) => variant.id === targetVariantId,
            )
          ) {
            return product;
          }

          return {
            ...product,
            variants: product.variants.map((variant) =>
              variant.id === targetVariantId
                ? {
                    ...variant,
                    quantity: Math.max(
                      0,
                      variant.quantity + delta,
                    ),
                  }
                : variant,
            ),
          };
        }

        return {
          ...product,
          quantity: Math.max(
            0,
            product.quantity + delta,
          ),
        };
      }),
    );
  };

  const selectVariant = (
    productId: number,
    variantId: string,
  ) => {
    setProducts((currentProducts) =>
      currentProducts.map((product) => {
        if (
          product.id !== productId ||
          product.type !== "variant"
        ) {
          return product;
        }

        return {
          ...product,
          selectedVariantId: variantId,
        };
      }),
    );
  };

  return (
    <main className="main-layout">
      <section className="main-layout__builder">
        <BundleBuilder
          products={products}
          plans={plans}
          selectedPlanId={selectedPlanId}
          onSelectPlan={setSelectedPlanId}
          onIncrease={(productId, variantId) =>
            changeQuantity(
              productId,
              1,
              variantId,
            )
          }
          onDecrease={(productId, variantId) =>
            changeQuantity(
              productId,
              -1,
              variantId,
            )
          }
          onSelectVariant={selectVariant}
        />
      </section>

      <section className="main-layout__review">
        <Summary
          products={products}
          plans={plans}
          selectedPlanId={selectedPlanId}
          onIncrease={(productId, variantId) =>
            changeQuantity(productId, 1, variantId)
          }
          onDecrease={(productId, variantId) =>
            changeQuantity(productId, -1, variantId)
          }
          onSave={handleSaveSystem}
        />
      </section>
    </main>
  );
}

export default Main;
