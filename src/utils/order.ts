import type { CartItem, OrderCustomer } from "@/types";

export const PHONE_DISPLAY = "0322 4200602";
export const PHONE_INTL = "+92 322 4200602";
export const PHONE_TEL = "tel:+923224200602";
export const WHATSAPP_NUMBER = import.meta.env['VITE_WHATSAPP_NUMBER'] ?? "923224200602";
export const MAPS_URL = "https://maps.app.goo.gl/m7a78SMGSAJYZbRn8?g_st=ac";
export const MAP_EMBED_URL =
  "https://www.google.com/maps?q=31.5695928,74.2887133&z=17&output=embed";
export const ADDRESS_EN = "H79Q+RFP, Outfall Rd, St Nagar, Lahore, 54000, Pakistan";
export const OPENING_HOURS = [
  "Monday – Friday: 6:00 AM – 1:00 AM",
  "Saturday – Sunday: 6:30 AM – 12:00 AM",
];


export function formatPrice(price: number | null | undefined): string {
  if (price === null || price === undefined) return "PKR —";
  return `PKR ${price.toLocaleString("en-PK")}`;
}

export function cartSubtotal(items: CartItem[]): number | null {
  if (items.some((i) => i.product.price === null || i.product.price === undefined)) return null;
  return items.reduce((sum, i) => sum + (i.product.price ?? 0) * i.quantity, 0);
}

export function buildWhatsAppMessage(items: CartItem[], customer?: Partial<OrderCustomer>) {
  const lines: string[] = [];
  lines.push("New Order / نیا آرڈر");
  lines.push("");
  if (customer?.name) lines.push(`Customer: ${customer.name}`);
  if (customer?.phone) lines.push(`Phone: ${customer.phone}`);
  lines.push("");
  lines.push("Products:");
  items.forEach((i) => {
    lines.push(`• ${i.product.name} (${i.product.nameUr}) ${i.product.weight ?? ""} × ${i.quantity} — ${formatPrice((i.product.price ?? 0) * i.quantity)}`);
  });
  lines.push("");
  const subtotal = cartSubtotal(items);
  lines.push(`Subtotal: ${subtotal === null ? "PKR —" : formatPrice(subtotal)}`);
  lines.push("Delivery: to be confirmed");
  lines.push(`Total: ${subtotal === null ? "PKR —" : formatPrice(subtotal)}`);
  lines.push("");
  if (customer?.address) lines.push(`Address: ${customer.address}${customer.city ? `, ${customer.city}` : ""}`);
  if (customer?.notes) lines.push(`Notes: ${customer.notes}`);
  return lines.join("\n");
}

export function whatsappUrl(message: string): string | null {
  if (!WHATSAPP_NUMBER) return null;
  return `https://wa.me/${WHATSAPP_NUMBER.replace(/[^\d]/g, "")}?text=${encodeURIComponent(message)}`;
}
