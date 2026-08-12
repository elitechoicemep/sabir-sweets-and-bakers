import { BRAND, formatPrice } from "@/lib/config";
import type { CartLine, CustomerDetails } from "@/types";

export interface WhatsAppOrderInput {
  customer?: Partial<CustomerDetails>;
  lines: CartLine[];
  subtotal: number | null;
  delivery: number | null;
  total: number | null;
}

export function buildOrderMessage({
  customer,
  lines,
  subtotal,
  delivery,
  total,
}: WhatsAppOrderInput): string {
  const items = lines.map((l) => `${l.product.name} × ${l.quantity}`).join("\n");
  return [
    "New Order",
    "",
    `Customer: ${customer?.fullName || "—"}`,
    `Phone: ${customer?.phone || "—"}`,
    "",
    "Products:",
    items || "—",
    "",
    `Subtotal: ${formatPrice(subtotal)}`,
    `Delivery: ${formatPrice(delivery)}`,
    `Total: ${formatPrice(total)}`,
    "",
    `Delivery Address: ${customer?.address || "—"}${customer?.city ? `, ${customer.city}` : ""}`,
    `Notes: ${customer?.notes || "—"}`,
  ].join("\n");
}

/** Returns null when no WhatsApp number is configured (VITE_WHATSAPP_NUMBER). */
export function whatsappLink(message: string): string | null {
  if (!BRAND.whatsapp) return null;
  return `https://wa.me/${BRAND.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}