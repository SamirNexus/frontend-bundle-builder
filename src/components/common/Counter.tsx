import "../../styles/components/Counter.css";

interface CounterProps {
  value: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  ariaLabel?: string;
}

function Counter({
  value,
  onIncrease,
  onDecrease,
  min = 0,
  ariaLabel = "Quantity",
}: CounterProps) {
  const isDecreaseDisabled = value <= min;

  return (
    <div
      className="counter"
      role="group"
      aria-label={ariaLabel}
    >
      <button
        type="button"
        className="counter__button"
        onClick={onDecrease}
        disabled={isDecreaseDisabled}
        aria-label={`Decrease ${ariaLabel.toLowerCase()}`}
      >
        <span aria-hidden="true">−</span>
      </button>

      <output
        className="counter__value"
        aria-live="polite"
      >
        {value}
      </output>

      <button
        type="button"
        className="counter__button"
        onClick={onIncrease}
        aria-label={`Increase ${ariaLabel.toLowerCase()}`}
      >
        <span aria-hidden="true">+</span>
      </button>
    </div>
  );
}

export default Counter;