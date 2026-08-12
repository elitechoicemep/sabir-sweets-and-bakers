import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/config";
import { buttonClass } from "@/components/ui/BrandButton";

export function CartDrawer() {
  const { isOpen, closeCart, lines, setQuantity, remove, subtotal, delivery, total } = useCart();

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={closeCart}
            className="fixed inset-0 z-[60] bg-brand-ink/55"
          />
          <motion.aside
            role="dialog"
            aria-label="Your basket"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-y-0 right-0 z-[61] flex w-full flex-col bg-brand-cream sm:max-w-[460px]"
          >
            <div className="flex items-center justify-between border-b border-brand-brown/12 px-6 py-5">
              <p className="label-xs text-brand-brown">Your Basket</p>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Close basket"
                className="grid h-11 w-11 place-items-center text-brand-brown transition-colors hover:text-brand-deep"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <p className="font-display text-2xl leading-snug text-brand-brown">
                  Your basket is waiting for something sweet.
                </p>
                <Link
                  to="/menu"
                  onClick={closeCart}
                  className={buttonClass("primary", "md", "mt-8")}
                >
                  Explore Menu
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 overflow-y-auto px-6 py-4">
                  {lines.map((line) => (
                    <li
                      key={line.product.id}
                      className="grid grid-cols-[72px_minmax(0,1fr)] gap-4 border-b border-brand-brown/10 py-5"
                    >
                      <img
                        src={line.product.image}
                        alt={line.product.name}
                        loading="lazy"
                        className="h-[88px] w-[72px] object-cover"
                      />
                      <div className="min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <p className="font-display text-lg leading-tight text-brand-brown">
                            {line.product.name}
                          </p>
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
                        <div className="mt-4 inline-flex items-center border border-brand-brown/20">
                          <button
                            type="button"
                            aria-label={`Decrease quantity of ${line.product.name}`}
                            onClick={() => setQuantity(line.product.id, line.quantity - 1)}
                            className="grid h-10 w-10 place-items-center text-brand-brown hover:bg-brand-orange"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-9 text-center font-label text-sm text-brand-brown">
                            {line.quantity}
                          </span>
                          <button
                            type="button"
                            aria-label={`Increase quantity of ${line.product.name}`}
                            onClick={() => setQuantity(line.product.id, line.quantity + 1)}
                            className="grid h-10 w-10 place-items-center text-brand-brown hover:bg-brand-orange"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-brand-brown/12 bg-brand-cream px-6 py-6">
                  <dl className="space-y-2 font-label text-sm text-brand-brown/80">
                    <div className="flex justify-between">
                      <dt>Subtotal</dt>
                      <dd>{formatPrice(subtotal)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Delivery</dt>
                      <dd>{formatPrice(delivery)}</dd>
                    </div>
                    <div className="flex justify-between border-t border-brand-brown/12 pt-3 text-brand-brown">
                      <dt className="label-xs">Total</dt>
                      <dd className="label-xs">{formatPrice(total)}</dd>
                    </div>
                  </dl>
                  <p className="mt-3 text-xs text-brand-brown/50">
                    Pricing is confirmed by the shop when your order is received.
                  </p>
                  <Link
                    to="/checkout"
                    onClick={closeCart}
                    className={buttonClass("primary", "md", "mt-5 w-full")}
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </>
            )}
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}