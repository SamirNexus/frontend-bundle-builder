import type { MouseEvent } from "react";

import { formatCurrency } from "../../utils/currency";
import {
  getProductTotalQuantity,
  getSelectedVariant,
} from "../../utils/product";
import type {
  Product,
  ProductVariant,
} from "../../types/Product";

import Badge from "../common/Badge";
import Counter from "../common/Counter";

import "../../styles/components/ProductCard.css";

interface ProductCardProps {
  product: Product;
  onIncrease: (variantId?: string) => void;
  onDecrease: (variantId?: string) => void;
  onSelectVariant: (variantId: string) => void;
}

interface ProductCardView {
  image: string;
  imageAlt: string;
  quantity: number;
  price: number;
  oldPrice?: number;
  selectedVariantId?: string;
}

function createProductCardView(
  product: Product,
): ProductCardView {
  if (product.type === "simple") {
    return {
      image: product.image,
      imageAlt: product.name,
      quantity: product.quantity,
      price: product.price,
      oldPrice: product.oldPrice,
    };
  }

  const selectedVariant = getSelectedVariant(product);

  return {
    image: selectedVariant.image,
    imageAlt: `${product.name} in ${selectedVariant.name}`,
    quantity: selectedVariant.quantity,
    price: selectedVariant.price,
    oldPrice: selectedVariant.oldPrice,
    selectedVariantId: selectedVariant.id,
  };
}

function ProductCard({
  product,
  onIncrease,
  onDecrease,
  onSelectVariant,
}: ProductCardProps) {
  const view = createProductCardView(product);
  const isSelected = getProductTotalQuantity(product) > 0;

  const handleLearnMoreClick = (
    event: MouseEvent<HTMLAnchorElement>,
  ) => {
    if (
      !product.learnMoreUrl ||
      product.learnMoreUrl === "#"
    ) {
      event.preventDefault();
    }
  };

  return (
    <article
      className={`product-card${
        isSelected ? " product-card--selected" : ""
      }`}
    >
      <div className="product-card__layout">
        <div className="product-card__media">
          {product.discount !== undefined && (
            <Badge variant="discount">
              Save {product.discount}%
            </Badge>
          )}

          <img
            src={view.image}
            alt={view.imageAlt}
            className="product-card__image"
          />
        </div>

        <div className="product-card__content">
          <h3 className="product-card__title">
            {product.name}
          </h3>

          {product.description && (
            <p className="product-card__description">
              {product.description}
            </p>
          )}

          {product.learnMoreUrl && (
            <a
              href={product.learnMoreUrl}
              className="product-card__link"
              onClick={handleLearnMoreClick}
            >
              Learn More
            </a>
          )}

          {product.type === "variant" && (
            <div
              className="product-card__variants"
              role="group"
              aria-label={`Choose a variant for ${product.name}`}
            >
              {product.variants.map(
                (variant: ProductVariant) => {
                  const isActive =
                    variant.id ===
                    product.selectedVariantId;

                  return (
                    <button
                      key={variant.id}
                      type="button"
                      className={`product-card__variant${
                        isActive
                          ? " product-card__variant--active"
                          : ""
                      }`}
                      onClick={() =>
                        onSelectVariant(variant.id)
                      }
                      aria-pressed={isActive}
                    >
                      <img
                        src={variant.image}
                        alt=""
                        aria-hidden="true"
                        className="product-card__variant-image"
                      />

                      <span className="product-card__variant-name">
                        {variant.name}
                      </span>
                    </button>
                  );
                },
              )}
            </div>
          )}
        </div>

        <div className="product-card__actions">
          <div className="product-card__pricing">
            {view.oldPrice !== undefined && (
              <del className="product-card__old-price">
                {formatCurrency(view.oldPrice)}
              </del>
            )}

            <span className="product-card__current-price">
              {formatCurrency(view.price)}
            </span>
          </div>

          <Counter
            value={view.quantity}
            onIncrease={() =>
              onIncrease(view.selectedVariantId)
            }
            onDecrease={() =>
              onDecrease(view.selectedVariantId)
            }
            ariaLabel={`${product.name} quantity`}
          />
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
