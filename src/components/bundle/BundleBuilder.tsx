import cameraIcon from "../../assets/icons/camera.png";
import planIcon from "../../assets/icons/plan.png";
import protectionIcon from "../../assets/icons/protection.png";
import sensorsIcon from "../../assets/icons/sensors.png";
import { useState } from "react";
import ProductList from "../product/ProductList";
import PlanSelector from "../plan/PlanSelector";
import Accordion from "./Accordion";
import NextButton from "./NextButton";
import type { Product } from "../../types/Product";
import type { Plan } from "../../types/Plan";

import "../../styles/components/BundleBuilder.css";
import "../../styles/components/NextButton.css";

interface BundleBuilderProps {
  products: Product[];
  plans: Plan[];
  selectedPlanId: string | null;
  onSelectPlan: (planId: string | null) => void;
  onIncrease: (
    productId: number,
    variantId?: string,
  ) => void;
  onDecrease: (
    productId: number,
    variantId?: string,
  ) => void;
  onSelectVariant: (
    productId: number,
    variantId: string,
  ) => void;
}

function BundleBuilder({
  products,
  plans,
  selectedPlanId,
  onSelectPlan,
  onIncrease,
  onDecrease,
  onSelectVariant,
}: BundleBuilderProps) {
  const [activeStep, setActiveStep] =
    useState<number | null>(1);

  const selectedCameraCount = products.filter(
    (product) =>
      product.category === "cameras" &&
      (product.type === "variant"
        ? product.variants.some((variant) => variant.quantity > 0)
        : product.quantity > 0),
  ).length;

  const getSelectedCount = (
    category: Product["category"],
  ) =>
    products.filter(
      (product) =>
        product.category === category &&
        (product.type === "variant"
          ? product.variants.some(
              (variant) => variant.quantity > 0,
            )
          : product.quantity > 0),
    ).length;

  const toggleStep = (step: number) => {
    setActiveStep((currentStep) =>
      currentStep === step ? null : step,
    );
  };

  const goToStep = (step: number) => {
    setActiveStep(step);
  };

  return (
    <section className="bundle-builder">
      <Accordion
        step={1}
        totalSteps={4}
        title="Choose your cameras"
        selectedCount={selectedCameraCount}
        iconSrc={cameraIcon}
        isOpen={activeStep === 1}
        onToggle={() => toggleStep(1)}
      >
        <ProductList
          products={products.filter(
            (product) =>
              product.category === "cameras",
          )}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
          onSelectVariant={onSelectVariant}
        />

        <div className="bundle-builder__next">
          <NextButton
            label="Next: Choose your plan"
            onClick={() => goToStep(2)}
          />
        </div>
      </Accordion>

      <Accordion
        step={2}
        totalSteps={4}
        title="Choose your plan"
        selectedCount={selectedPlanId === null ? 0 : 1}
        iconSrc={planIcon}
        isOpen={activeStep === 2}
        onToggle={() => toggleStep(2)}
      >
        <PlanSelector
          plans={plans}
          selectedPlanId={selectedPlanId}
          onSelectPlan={onSelectPlan}
        />

        <div className="bundle-builder__next">
          <NextButton
            label="Next: Choose your sensors"
            onClick={() => goToStep(3)}
          />
        </div>
      </Accordion>

      <Accordion
        step={3}
        totalSteps={4}
        title="Choose your sensors"
        selectedCount={getSelectedCount("sensors")}
        iconSrc={sensorsIcon}
        isOpen={activeStep === 3}
        onToggle={() => toggleStep(3)}
      >
        <ProductList
          products={products.filter(
            (product) => product.category === "sensors",
          )}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
          onSelectVariant={onSelectVariant}
        />

        <div className="bundle-builder__next">
          <NextButton
            label="Next: Add extra protection"
            onClick={() => goToStep(4)}
          />
        </div>
      </Accordion>

      <Accordion
        step={4}
        totalSteps={4}
        title="Add extra protection"
        selectedCount={getSelectedCount("accessories")}
        iconSrc={protectionIcon}
        isOpen={activeStep === 4}
        onToggle={() => toggleStep(4)}
      >
        <ProductList
          products={products.filter(
            (product) =>
              product.category === "accessories",
          )}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
          onSelectVariant={onSelectVariant}
        />
      </Accordion>
    </section>
  );
}

export default BundleBuilder;
