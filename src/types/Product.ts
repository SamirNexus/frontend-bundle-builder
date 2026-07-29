export type ProductCategory =
  | "cameras"
  | "sensors"
  | "accessories";

export interface ProductVariant {
  id: string;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  quantity: number;
}

interface ProductBase {
  id: number;
  category: ProductCategory;
  name: string;
  description?: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  learnMoreUrl?: string;
}

export interface ProductWithVariants extends ProductBase {
  type: "variant";
  variants: ProductVariant[];
  selectedVariantId: string;
}

export interface ProductWithoutVariants extends ProductBase {
  type: "simple";
  image: string;
  quantity: number;
}

export type Product =
  | ProductWithVariants
  | ProductWithoutVariants;
