import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/currency";

interface TotalPriceProps {
  total: number;
  oldTotal: number;
  savings: number;
  isEmpty: boolean;
  configurationKey: string;
  onSave: () => boolean;
}

function TotalPrice({
  total,
  oldTotal,
  savings,
  isEmpty,
  configurationKey,
  onSave,
}: TotalPriceProps) {
  const [savedConfigurationKey, setSavedConfigurationKey] = useState<
    string | null
  >(null);
  const [checkedOutConfigurationKey, setCheckedOutConfigurationKey] =
    useState<string | null>(null);
  const [saveFailed, setSaveFailed] = useState(false);
  const isSaved = savedConfigurationKey === configurationKey;
  const isCheckoutConfirmed =
    checkedOutConfigurationKey === configurationKey;

  useEffect(() => {
    if (!isSaved) {
      return;
    }

    const messageTimer = window.setTimeout(() => {
      setSavedConfigurationKey(null);
    }, 2000);

    return () => {
      window.clearTimeout(messageTimer);
    };
  }, [isSaved]);

  const handleSave = () => {
    if (onSave()) {
      setSaveFailed(false);
      setSavedConfigurationKey(configurationKey);
      return;
    }

    setSaveFailed(true);
  };

  const handleCheckout = () => {
    setCheckedOutConfigurationKey(configurationKey);
  };

  return (
    <footer className="total-price">
      <div className="total-price__guarantee-row">
        <img
          className="total-price__guarantee"
          src="/images/review/satisfaction-guarantee.png"
          alt="100% Wyze satisfaction guarantee"
        />

        <div className="total-price__amounts">
          {savings > 0 && (
            <del className="total-price__old">
              {formatCurrency(oldTotal)}
            </del>
          )}
          <strong className="total-price__current">
            {formatCurrency(total)}
          </strong>
        </div>
      </div>

      {savings > 0 && (
        <p className="total-price__saving">
          Congrats! You’re saving {formatCurrency(savings)} on your
          security bundle!
        </p>
      )}

      <button
        className="total-price__checkout"
        type="button"
        onClick={handleCheckout}
        disabled={isEmpty}
      >
        Checkout
      </button>

      {isCheckoutConfirmed && (
        <p
          className="total-price__checkout-message"
          role="status"
          aria-live="polite"
        >
          Your system is ready for checkout!
        </p>
      )}

      <button
        className="total-price__save"
        type="button"
        onClick={handleSave}
        disabled={isEmpty}
      >
        {isSaved ? "System saved!" : "Save my system for later"}
      </button>

      {saveFailed && (
        <p
          className="total-price__save-error"
          role="alert"
        >
          We couldn’t save your system. Please try again.
        </p>
      )}
    </footer>
  );
}

export default TotalPrice;
