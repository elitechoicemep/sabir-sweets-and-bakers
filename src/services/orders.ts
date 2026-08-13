import { apiPost } from "./api";
import type { CartItem, Order, OrderCustomer, OrderStatus } from "@/types";

export const orderStatuses: OrderStatus[] = [
  "pending",
  "confirmed",
  "preparing",
  "ready",
  "out",
  "delivered",
  "cancelled",
];

/** Placeholder submit. Wire to a backend/table when available. */
export function createOrder(items: CartItem[], customer: OrderCustomer): Promise<Order> {
  const draft: Order = {
    id: `SSB-${Date.now().toString(36).toUpperCase()}`,
    items,
    customer,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  return apiPost<Order, Order>("/orders", draft, () => draft);
}
