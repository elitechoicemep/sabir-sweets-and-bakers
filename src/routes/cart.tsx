import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PickupDialog } from "@/components/PickupDialog";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useLanguage } from "@/lib/i18n";
import { SectionHeading } from "@/components/Ornament";
import { cartSubtotal, formatPrice } from "@/utils/order";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Basket | Sabir Sweets & Bakers" },
      { name: "description", content: "Review the sweets and bakery items in your Sabir Sweets & Bakers basket." },
      { property: "og:title", content: "Your Basket | Sabir Sweets & Bakers" },
      { property: "og:description", content: "Review your order before checkout." },
      { property: "og:url", content: "/cart" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/cart" }],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, setQuantity, remove } = useCart();
  const { t, tUr, isUrdu } = useLanguage();
  const subtotal = cartSubtotal(items);
  const [pickupOpen, setPickupOpen] = useState(false);

  return (
    <div className="bg-background pb-24">
      <section className="jaali border-b border-border bg-secondary/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="Basket" title={t("cart.title")} />
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        {items.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-base text-muted-foreground">{t("cart.empty")}</p>
            <Link
              to="/menu"
              className="eyebrow mt-6 inline-flex min-h-12 items-center rounded-sm bg-primary px-6 text-primary-foreground hover:bg-burnt hover:text-accent-foreground"
            >
              {t("cart.emptyCta")}
            </Link>
          </div>
        ) : (
          <>
            <ul className="divide-y divide-border">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="flex gap-4 py-5">
                  <img src={product.image} alt="" loading="lazy" className="size-24 rounded-sm object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-base">{isUrdu ? product.nameUr : product.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {isUrdu ? product.weightUr : product.weight}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <div className="flex items-center rounded-sm border border-border">
                        <button type="button" aria-label="-" onClick={() => setQuantity(product.id, quantity - 1)} className="grid size-10 place-items-center hover:text-burnt">
                          <Minus className="size-3.5" />
                        </button>
                        <span className="min-w-8 text-center font-nav text-sm">{quantity}</span>
                        <button type="button" aria-label="+" onClick={() => setQuantity(product.id, quantity + 1)} className="grid size-10 place-items-center hover:text-burnt">
                          <Plus className="size-3.5" />
                        </button>
                      </div>
                      <span className="font-nav text-sm text-burnt">{formatPrice(product.price)}</span>
                      <button type="button" aria-label={t("cart.remove")} onClick={() => remove(product.id)} className="grid size-10 place-items-center text-muted-foreground hover:text-destructive">
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <dl className="mt-8 space-y-2 border-t border-border pt-6 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">{t("cart.subtotal")}</dt>
                <dd>{subtotal === null ? "PKR —" : formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">{t("cart.delivery")}</dt>
                <dd className="text-xs text-muted-foreground">{t("cart.deliveryNote")}</dd>
              </div>
              <div className="flex justify-between border-t border-border pt-2 font-nav font-semibold">
                <dt>{t("cart.total")}</dt>
                <dd>{subtotal === null ? "PKR —" : formatPrice(subtotal)}</dd>
              </div>
            </dl>

            <button
              type="button"
              onClick={() => setPickupOpen(true)}
              className="eyebrow mt-6 flex w-full min-h-12 items-center justify-center rounded-sm bg-ink text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              {t("cart.checkout")}
                    <span className="ms-2 font-urdu text-sm tracking-normal normal-case">
                      {tUr("cart.checkout")}
                    </span>
            </button>
          </>
        )}
      </div>
      <PickupDialog open={pickupOpen} onClose={() => setPickupOpen(false)} />
    </div>
  );
}
