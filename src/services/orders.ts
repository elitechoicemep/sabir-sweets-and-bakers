import type { Order, OrderDraft, OrderStatus } from "@/types";
import { API_BASE_URL, request } from "./api";

export const ORDER_STATUSES: OrderStatus[] = [
  "pending",
  "confirmed",
  "preparing",
  "ready",
  "out_for_delivery",
  "delivered",
  "cancelled",
];

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  preparing: "Preparing",
  ready: "Ready",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

/**
 * Creates an order. Without a configured backend the order is recorded
 * locally so the flow stays honest about what happened.
 */
export async function createOrder(draft: OrderDraft): Promise<Order> {
  if (API_BASE_URL) {
    return request<Order>("/orders", { method: "POST", body: JSON.stringify(draft) });
  }
  return {
    ...draft,
    id: `LOCAL-${Date.now().toString(36).toUpperCase()}`,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
}

export async function listOrders(): Promise<Order[]> {
  if (API_BASE_URL) return request<Order[]>("/orders");
  return [];
}