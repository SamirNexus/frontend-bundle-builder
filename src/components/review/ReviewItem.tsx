import { formatCurrency } from "../../utils/currency";

interface ReviewItemProps {
  name: string;
  image: string;
  quantity: number;
  price: number;
  oldPrice?: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

function ReviewItem({
  name,
  image,
  quantity,
  price,
  oldPrice,
  onIncrease,
  onDecrease,
}: ReviewItemProps) {
  const itemTotal = price * quantity;
  const oldItemTotal = oldPrice
    ? oldPrice * quantity
    : undefined;

  return (
    <article className="review-item">
      <div className="review-item__image-wrap">
        <img
          className="review-item__image"
          src={image}
          alt=""
        />
      </div>

      <h4 className="review-item__name">{name}</h4>

      <div
        className="review-item__counter"
        aria-label={`${name} quantity`}
      >
        <button
          className="review-item__counter-button"
          type="button"
          onClick={onDecrease}
          aria-label={`Decrease ${name} quantity`}
        >
          −
        </button>
        <span className="review-item__quantity">{quantity}</span>
        <button
          className="review-item__counter-button"
          type="button"
          onClick={onIncrease}
          aria-label={`Increase ${name} quantity`}
        >
          +
        </button>
      </div>

      <div className="review-item__price">
        {oldItemTotal !== undefined && (
          <del>{formatCurrency(oldItemTotal)}</del>
        )}
        <strong>{formatCurrency(itemTotal)}</strong>
      </div>
    </article>
  );
}

export default ReviewItem;
