import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useLanguage } from "@/lib/i18n";
import { cartSubtotal, formatPrice } from "@/utils/order";
import { PickupDialog } from "@/components/PickupDialog";
import { useState } from "react";

export function CartDrawer() {
  const { items, isOpen, closeCart, setQuantity, remove, count } = useCart();
  const { t, tUr, isUrdu } = useLanguage();
  const subtotal = cartSubtotal(items);
  const [pickupOpen, setPickupOpen] = useState(false);

  return (
    <>
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-[60] flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            type="button"
            aria-label={t("cart.close")}
            onClick={closeCart}
            className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
          />
          <motion.aside
            role="dialog"
            aria-label={t("cart.title")}
            initial={{ x: isUrdu ? "-100%" : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: isUrdu ? "-100%" : "100%" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex h-dvh w-full flex-col bg-background shadow-lift sm:max-w-md"
          >
            <header className="flex items-center justify-between gap-4 border-b border-border px-5 py-4">
              <div className="min-w-0">
                <h2 className="truncate font-display text-xl">{t("cart.title")}</h2>
                <p className="text-xs text-muted-foreground">
                  {count} {t("cart.items")}
                </p>
              </div>
              <button
                type="button"
                onClick={closeCart}
                aria-label={t("cart.close")}
                className="grid size-11 shrink-0 place-items-center rounded-sm text-foreground transition-colors hover:text-burnt focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                <X className="size-5" />
              </button>
            </header>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
                <p className="text-base text-muted-foreground">{t("cart.empty")}</p>
                <Link
                  to="/menu"
                  onClick={closeCart}
                  className="eyebrow inline-flex min-h-11 items-center rounded-sm bg-primary px-5 text-primary-foreground transition-colors hover:bg-burnt hover:text-accent-foreground"
                >
                  {t("cart.emptyCta")}
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-border overflow-y-auto px-5">
                  {items.map(({ product, quantity }) => (
                    <li key={product.id} className="flex gap-4 py-4">
                      <img
                        src={product.image}
                        alt=""
                        loading="lazy"
                        className="size-20 shrink-0 rounded-sm object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">
                          {isUrdu ? product.nameUr : product.name}
                        </p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {isUrdu ? product.weightUr : product.weight}
                        </p>
                        <div className="mt-3 flex items-center justify-between gap-3">
                          <div className="flex items-center rounded-sm border border-border">
                            <button
                              type="button"
                              onClick={() => setQuantity(product.id, quantity - 1)}
                              aria-label="-"
                              className="grid size-9 place-items-center text-foreground hover:text-burnt"
                            >
                              <Minus className="size-3.5" />
                            </button>
                            <span className="min-w-8 text-center font-nav text-sm">{quantity}</span>
                            <button
                              type="button"
                              onClick={() => setQuantity(product.id, quantity + 1)}
                              aria-label="+"
                              className="grid size-9 place-items-center text-foreground hover:text-burnt"
                            >
                              <Plus className="size-3.5" />
                            </button>
                          </div>
                          <span className="font-nav text-sm text-burnt">
                            {formatPrice(product.price)}
                          </span>
                          <button
                            type="button"
                            onClick={() => remove(product.id)}
                            aria-label={t("cart.remove")}
                            className="grid size-9 place-items-center text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <footer className="border-t border-border bg-card px-5 py-5">
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">{t("cart.subtotal")}</dt>
                      <dd>{subtotal === null ? "PKR —" : formatPrice(subtotal)}</dd>
                    </div>
                    <div className="flex justify-between border-t border-border pt-2 font-nav font-semibold">
                      <dt>{t("cart.total")}</dt>
                      <dd>{subtotal === null ? "PKR —" : formatPrice(subtotal)}</dd>
                    </div>
                  </dl>
                  <button
                    type="button"
                    onClick={() => setPickupOpen(true)}
                    className="eyebrow mt-4 flex min-h-12 w-full items-center justify-center rounded-sm bg-ink text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    {t("cart.checkout")}
                    <span className="ms-2 font-urdu text-sm tracking-normal normal-case">
                      {tUr("cart.checkout")}
                    </span>
                  </button>
                </footer>
              </>
            )}
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
    <PickupDialog open={pickupOpen} onClose={() => setPickupOpen(false)} />
    </>
  );
}
