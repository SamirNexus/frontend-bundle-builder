import type { Product } from "../../types/Product";
import type { Plan } from "../../types/Plan";
import {
  calculateBundleTotals,
  createConfigurationKey,
  getSelectedItems,
} from "../../utils/bundle";
import ReviewItem from "./ReviewItem";
import TotalPrice from "./TotalPrice";

import "../../styles/components/Summary.css";

interface SummaryProps {
  products: Product[];
  plans: Plan[];
  selectedPlanId: string | null;
  onIncrease: (productId: number, variantId?: string) => void;
  onDecrease: (productId: number, variantId?: string) => void;
  onSave: () => boolean;
}

function Summary({
  products,
  plans,
  selectedPlanId,
  onIncrease,
  onDecrease,
  onSave,
}: SummaryProps) {
  const selectedPlan =
    plans.find((plan) => plan.id === selectedPlanId) ?? null;
  const selectedItems = getSelectedItems(products);
  const { total, oldTotal, savings } = calculateBundleTotals(
    selectedItems,
    selectedPlan,
  );
  const configurationKey = createConfigurationKey(
    products,
    selectedPlanId,
  );

  const sections = [
    { category: "cameras", title: "CAMERAS" },
    { category: "sensors", title: "SENSORS" },
    { category: "accessories", title: "ACCESSORIES" },
  ] as const;

  return (
    <aside className="summary" aria-label="Bundle review">
      <p className="summary__eyebrow">REVIEW</p>

      <header className="summary__header">
        <h2 className="summary__title">Your security system</h2>
        <p className="summary__description">
          Review your personalized protection system designed to keep
          what matters most safe.
        </p>
      </header>

      {sections.map(({ category, title }) => {
        const sectionItems = selectedItems.filter(
          (item) => item.category === category,
        );

        if (sectionItems.length === 0) {
          return null;
        }

        return (
          <section className="summary__section" key={category}>
            <h3 className="summary__section-title">{title}</h3>

            <div className="summary__items">
              {sectionItems.map((item) => (
                <ReviewItem
                  key={item.key}
                  name={item.name}
                  image={item.image}
                  quantity={item.quantity}
                  price={item.price}
                  oldPrice={item.oldPrice}
                  onIncrease={() =>
                    onIncrease(item.productId, item.variantId)
                  }
                  onDecrease={() =>
                    onDecrease(item.productId, item.variantId)
                  }
                />
              ))}
            </div>
          </section>
        );
      })}

      {selectedPlan !== null && (
        <section className="summary__section summary__plan">
          <h3 className="summary__section-title">PLAN</h3>
          <div className="summary__benefit">
            <img
              className="summary__benefit-icon"
              src={selectedPlan.image}
              alt=""
            />
            <p className="summary__benefit-name">{selectedPlan.name}</p>
            <p className="summary__benefit-price">
              {selectedPlan.oldPrice !== undefined && (
                <del>
                  ${selectedPlan.oldPrice.toFixed(2)}
                  {selectedPlan.billingPeriod}
                </del>
              )}
              <strong>
                ${selectedPlan.price.toFixed(2)}
                {selectedPlan.billingPeriod}
              </strong>
            </p>
          </div>
        </section>
      )}

      <section className="summary__section summary__shipping">
        <div className="summary__benefit">
          <span className="summary__benefit-icon-wrap">
            <img
              className="summary__benefit-icon"
              src="/images/review/fast-shipping.png"
              alt=""
            />
          </span>
          <p className="summary__benefit-name">Fast Shipping</p>
          <p className="summary__benefit-price">
            <del>$5.99</del>
            <strong>FREE</strong>
          </p>
        </div>
      </section>

      <TotalPrice
        total={total}
        oldTotal={oldTotal}
        savings={savings}
        isEmpty={
          selectedItems.length === 0 && selectedPlan === null
        }
        configurationKey={configurationKey}
        onSave={onSave}
      />
    </aside>
  );
}

export default Summary;
