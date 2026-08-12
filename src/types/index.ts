export type CategorySlug =
  | "mithai"
  | "cakes"
  | "bakery"
  | "biscuits"
  | "desserts"
  | "namkeen"
  | "nashta"
  | "beverages";

export interface Category {
  slug: CategorySlug;
  name: string;
  tagline: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  category: CategorySlug;
  description: string;
  /** null until the client provides verified pricing. */
  price: number | null;
  weight: string | null;
  image: string;
  gallery?: string[];
  featured?: boolean;
  bestSeller?: boolean;
}

export interface CartLine {
  product: Product;
  quantity: number;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "ready"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export interface CustomerDetails {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  notes: string;
}

export interface OrderDraft {
  customer: CustomerDetails;
  lines: CartLine[];
  subtotal: number | null;
  delivery: number | null;
  total: number | null;
}

export interface Order extends OrderDraft {
  id: string;
  status: OrderStatus;
  createdAt: string;
}