export interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  billingPeriod: string;
  image: string;
  features: string[];
}
