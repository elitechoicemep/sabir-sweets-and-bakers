import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/config";
import { buttonClass } from "@/components/ui/BrandButton";

const TITLE = "Your Basket | Sabir Sweets & Bakers";
const DESCRIPTION = "Review the sweets and bakery items in your Sabir Sweets & Bakers basket.";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/cart" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/cart" }],
  }),
  component: CartPage,
});

function CartPage() {
  const { lines, setQuantity, remove, subtotal, delivery, total } = useCart();

  return (
    <>
      <PageHeader label="Basket" title="Your basket" />
      <section className="bg-brand-cream py-16 sm:py-20">
        <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
          {lines.length === 0 ? (
            <div className="py-16 text-center">
              <p className="font-display text-3xl text-brand-brown">
                Your basket is waiting for something sweet.
              </p>
              <Link to="/menu" className={buttonClass("primary", "lg", "mt-8")}>
                Explore Menu
              </Link>
            </div>
          ) : (
            <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
              <ul>
                {lines.map((line) => (
                  <li
                    key={line.product.id}
                    className="grid grid-cols-[88px_minmax(0,1fr)] gap-5 border-b border-brand-brown/15 py-6"
                  >
                    <img
                      src={line.product.image}
                      alt={line.product.name}
                      loading="lazy"
                      className="h-[110px] w-[88px] object-cover"
                    />
                    <div className="min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <h2 className="font-display text-xl text-brand-brown">
                          {line.product.name}
                        </h2>
                        <button
                          type="button"
                          onClick={() => remove(line.product.id)}
                          className="label-xs shrink-0 text-brand-brown/50 hover:text-brand-deep"
                        >
                          Remove
                        </button>
                      </div>
                      <p className="label-xs mt-2 text-brand-orange">
                        {formatPrice(line.product.price)}
                      </p>
                      <div className="mt-4 inline-flex items-center border border-brand-brown/25">
                        <button
                          type="button"
                          aria-label={`Decrease quantity of ${line.product.name}`}
                          onClick={() => setQuantity(line.product.id, line.quantity - 1)}
                          className="grid h-11 w-11 place-items-center text-brand-brown hover:bg-brand-orange"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-10 text-center font-label text-sm text-brand-brown">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label={`Increase quantity of ${line.product.name}`}
                          onClick={() => setQuantity(line.product.id, line.quantity + 1)}
                          className="grid h-11 w-11 place-items-center text-brand-brown hover:bg-brand-orange"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <aside className="h-fit border border-brand-brown/15 p-7">
                <h2 className="label-xs text-brand-deep">Order Summary</h2>
                <dl className="mt-6 space-y-3 font-label text-sm text-brand-brown/80">
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
                <Link to="/checkout" className={buttonClass("primary", "md", "mt-7 w-full")}>
                  Proceed to Checkout
                </Link>
              </aside>
            </div>
          )}
        </div>
      </section>
    </>
  );
}