/**
 * Central brand configuration.
 * Contact details that have not been verified by the client are left null and
 * rendered as placeholders — never invent phone numbers or opening hours.
 */
const env = import.meta.env as Record<string, string | undefined>;

export const BRAND = {
  name: "Sabir Sweets & Bakers",
  shortName: "Sabir Sweets",
  statement: "Tradition in every bite.",
  supporting: "Freshly made. Traditionally loved.",
  address: {
    line1: "Outfall Road",
    line2: "Saint Nagar",
    city: "Lahore, Pakistan",
  },
  mapsUrl: "https://maps.app.goo.gl/m7a78SMGSAJYZbRn8?g_st=ac",
  mapsEmbedQuery: "Outfall Road, Saint Nagar, Lahore, Pakistan",
  /** Set VITE_CONTACT_PHONE once the client confirms the number. */
  phone: env["VITE_CONTACT_PHONE"] ?? null,
  /** Set VITE_WHATSAPP_NUMBER (international format, digits only). */
  whatsapp: env["VITE_WHATSAPP_NUMBER"] ?? null,
  email: env["VITE_CONTACT_EMAIL"] ?? null,
  /** Opening hours are intentionally unset until confirmed. */
  hours: env["VITE_OPENING_HOURS"] ?? null,
  social: {
    instagram: env["VITE_INSTAGRAM_URL"] ?? null,
    facebook: env["VITE_FACEBOOK_URL"] ?? null,
  },
  currency: "PKR",
} as const;

export const PRICE_PLACEHOLDER = "PKR —";

export function formatPrice(value: number | null): string {
  if (value === null || Number.isNaN(value)) return PRICE_PLACEHOLDER;
  return `PKR ${value.toLocaleString("en-PK")}`;
}