import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/config";
import { buttonClass } from "@/components/ui/BrandButton";
import { createOrder } from "@/services/orders";
import { buildOrderMessage, whatsappLink } from "@/utils/whatsapp";
import type { CustomerDetails } from "@/types";

const TITLE = "Checkout | Sabir Sweets & Bakers";
const DESCRIPTION = "Complete your Sabir Sweets & Bakers order for delivery in Lahore.";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/checkout" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/checkout" }],
  }),
  component: CheckoutPage,
});

const EMPTY: CustomerDetails = {
  fullName: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  notes: "",
};

function CheckoutPage() {
  const { lines, subtotal, delivery, total, clear } = useCart();
  const [customer, setCustomer] = useState<CustomerDetails>(EMPTY);
  const [placed, setPlaced] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const set = (key: keyof CustomerDetails) => (v: string) =>
    setCustomer((c) => ({ ...c, [key]: v }));

  const wa = whatsappLink(buildOrderMessage({ customer, lines, subtotal, delivery, total }));

  const field =
    "mt-2 min-h-11 w-full border border-brand-brown/25 bg-transparent px-4 py-3 font-sans text-sm text-brand-brown outline-none focus:border-brand-orange";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const order = await createOrder({ customer, lines, subtotal, delivery, total });
      setPlaced(order.id);
      clear();
    } finally {
      setBusy(false);
    }
  }

  if (placed) {
    return (
      <>
        <PageHeader label="Checkout" title="Order received" />
        <section className="bg-brand-cream py-20">
          <div className="mx-auto max-w-2xl px-5 text-center sm:px-8">
            <p className="font-display text-2xl text-brand-brown">
              Reference <span className="text-brand-deep">{placed}</span>
            </p>
            <p className="mt-4 text-sm leading-relaxed text-brand-brown/65">
              Your order has been recorded on this device. Order processing and confirmation go live
              once the shop&apos;s backend and WhatsApp number are connected.
            </p>
            <Link to="/menu" className={buttonClass("primary", "lg", "mt-8")}>
              Back to Menu
            </Link>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHeader label="Checkout" title="Complete your order" />
      <section className="bg-brand-cream py-16 sm:py-20">
        <div className="mx-auto grid max-w-[1100px] gap-12 px-5 sm:px-8 lg:grid-cols-[1.4fr_1fr]">
          <form onSubmit={submit} className="space-y-6">
            {(
              [
                ["fullName", "Full Name", true],
                ["phone", "Phone Number", true],
                ["email", "Email", false],
                ["address", "Delivery Address", true],
                ["city", "City", true],
              ] as const
            ).map(([key, label, required]) => (
              <div key={key}>
                <label htmlFor={`co-${key}`} className="label-xs text-brand-brown/60">
                  {label}
                </label>
                <input
                  id={`co-${key}`}
                  required={required}
                  type={key === "email" ? "email" : "text"}
                  value={customer[key]}
                  onChange={(e) => set(key)(e.target.value)}
                  className={field}
                />
              </div>
            ))}
            <div>
              <label htmlFor="co-notes" className="label-xs text-brand-brown/60">
                Order Notes
              </label>
              <textarea
                id="co-notes"
                rows={4}
                value={customer.notes}
                onChange={(e) => set("notes")(e.target.value)}
                className={field}
              />
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="submit"
                disabled={busy || lines.length === 0}
                className={buttonClass("primary", "lg")}
              >
                {busy ? "Placing…" : "Place Order"}
              </button>
              {wa ? (
                <a
                  href={wa}
                  target="_blank"
                  rel="noreferrer"
                  className={buttonClass("secondary", "lg")}
                >
                  Order via WhatsApp
                </a>
              ) : null}
            </div>
            {!wa ? (
              <p className="text-xs text-brand-brown/55">
                WhatsApp ordering activates once VITE_WHATSAPP_NUMBER is configured.
              </p>
            ) : null}
          </form>

          <aside className="h-fit border border-brand-brown/15 p-7">
            <h2 className="label-xs text-brand-deep">Order Summary</h2>
            {lines.length === 0 ? (
              <p className="mt-6 text-sm text-brand-brown/60">Your basket is empty.</p>
            ) : (
              <ul className="mt-6 space-y-3 font-label text-sm text-brand-brown/80">
                {lines.map((l) => (
                  <li key={l.product.id} className="flex justify-between gap-4">
                    <span className="min-w-0 truncate">
                      {l.product.name} × {l.quantity}
                    </span>
                    <span className="shrink-0">{formatPrice(l.product.price)}</span>
                  </li>
                ))}
              </ul>
            )}
            <dl className="mt-6 space-y-3 border-t border-brand-brown/15 pt-5 font-label text-sm text-brand-brown/80">
              <div className="flex justify-between">
                <dt>Subtotal</dt>
                <dd>{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Delivery</dt>
                <dd>{formatPrice(delivery)}</dd>
              </div>
              <div className="flex justify-between border-t border-brand-brown/15 pt-3 text-brand-brown">
                <dt className="label-xs">Total</dt>
                <dd className="label-xs">{formatPrice(total)}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>
    </>
  );
}