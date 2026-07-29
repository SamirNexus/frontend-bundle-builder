import type { Plan } from "../../types/Plan";

import "../../styles/components/PlanSelector.css";

interface PlanSelectorProps {
  plans: Plan[];
  selectedPlanId: string | null;
  onSelectPlan: (planId: string | null) => void;
}

function PlanSelector({
  plans,
  selectedPlanId,
  onSelectPlan,
}: PlanSelectorProps) {
  return (
    <div className="plan-selector">
      {plans.map((plan) => {
        const isSelected = selectedPlanId === plan.id;

        return (
          <button
            className={`plan-card${isSelected ? " plan-card--selected" : ""}`}
            key={plan.id}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onSelectPlan(plan.id)}
          >
            <span className="plan-card__radio" aria-hidden="true" />

            <img className="plan-card__image" src={plan.image} alt="" />

            <span className="plan-card__content">
              <strong className="plan-card__name">{plan.name}</strong>
              <span className="plan-card__description">{plan.description}</span>

              <span className="plan-card__features">
                {plan.features.map((feature) => (
                  <span className="plan-card__feature" key={feature}>
                    {feature}
                  </span>
                ))}
              </span>
            </span>

            <span className="plan-card__price">
              {plan.oldPrice !== undefined && <del>${plan.oldPrice.toFixed(2)}</del>}
              <strong>
                ${plan.price.toFixed(2)}
                <small>{plan.billingPeriod}</small>
              </strong>
            </span>
          </button>
        );
      })}

      <button
        className={`plan-card plan-card--none${
          selectedPlanId === null ? " plan-card--selected" : ""
        }`}
        type="button"
        aria-pressed={selectedPlanId === null}
        onClick={() => onSelectPlan(null)}
      >
        <span className="plan-card__radio" aria-hidden="true" />
        <span className="plan-card__content">
          <strong className="plan-card__name">No plan</strong>
          <span className="plan-card__description">
            Continue with standard device features only.
          </span>
        </span>
        <strong className="plan-card__free">FREE</strong>
      </button>
    </div>
  );
}

export default PlanSelector;
