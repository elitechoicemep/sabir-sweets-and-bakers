export type CategoryId = "mithai" | "laddu" | "khasta" | "halwa" | "namkeen";

export type Category = {
  id: CategoryId;
  name: string;
  nameUr: string;
  image: string;
};

export type Product = {
  id: string;
  /** Set on size variants; points back to the catalog product. */
  baseId?: string;
  name: string;
  nameUr: string;
  category: CategoryId;
  description: string;
  descriptionUr: string;
  /** "kg" (default) sells by weight; "piece" sells per single item */
  unit?: "kg" | "piece";
  /** Rate-list price for 1 kg (or per piece when unit is "piece") */
  pricePerKg: number | null;
  /** Price for the selected size (set on variants) */
  price?: number | null;
  /** Selected size in kg (set on variants) */
  sizeKg?: number;
  weight?: string;
  weightUr?: string;
  image: string;
  featured?: boolean;
};


export type CartItem = {
  product: Product;
  quantity: number;
};

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "ready"
  | "out"
  | "delivered"
  | "cancelled";

export type OrderCustomer = {
  name: string;
  phone: string;
  email?: string;
  address: string;
  city?: string;
  notes?: string;
};

export type Order = {
  id: string;
  items: CartItem[];
  customer: OrderCustomer;
  status: OrderStatus;
  createdAt: string;
};
