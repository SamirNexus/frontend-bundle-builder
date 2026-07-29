import ProductCard from "./ProductCard";
import type { Product } from "../../types/Product";
import "../../styles/components/ProductList.css";

interface ProductListProps {
  products: Product[];
  onIncrease: (id: number, variantId?: string) => void;
  onDecrease: (id: number, variantId?: string) => void;
  onSelectVariant: (id: number, variantId: string) => void;
}

function ProductList({
  products,
  onIncrease,
  onDecrease,
  onSelectVariant,
}: ProductListProps) {
  return (
    <section className="product-list">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onIncrease={(variantId) =>
            onIncrease(product.id, variantId)
          }
          onDecrease={(variantId) =>
            onDecrease(product.id, variantId)
          }
          onSelectVariant={(variantId) =>
            onSelectVariant(product.id, variantId)
          }
        />
      ))}
    </section>
  );
}

export default ProductList;
