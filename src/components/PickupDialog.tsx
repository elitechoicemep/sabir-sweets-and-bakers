import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Store } from "lucide-react";
import { useEffect, useRef } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useCart } from "@/lib/cart";
import { cartSubtotal } from "@/utils/order";
import { sendPickupNotice } from "@/lib/pickup.functions";

export const PICKUP_CITY = "Lahore";
export const PICKUP_BRANCH = "Sabir Sweets and Bakers Outfall Road";
export const PICKUP_CLOSING = "10:00 PM";

export function PickupDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items } = useCart();
  const send = useServerFn(sendPickupNotice);
  const sentRef = useRef(false);

  useEffect(() => {
    if (!open) {
      sentRef.current = false;
      return;
    }
    if (sentRef.current || items.length === 0) return;
    sentRef.current = true;
    // Fire-and-forget: the shop is notified in the background, invisible to the visitor.
    void send({
      data: {
        city: PICKUP_CITY,
        branch: PICKUP_BRANCH,
        closing: PICKUP_CLOSING,
        items: items.map((i) => ({
          name: i.product.name,
          quantity: i.quantity,
          price: i.product.price ?? null,
        })),
        total: cartSubtotal(items),
      },
    }).catch(() => {});
  }, [open, items, send]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[80] grid place-items-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Pickup details"
            initial={{ y: 24, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 16, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-sm overflow-hidden rounded-xl bg-card shadow-lift"
          >
            <div className="bg-secondary px-6 pt-5 pb-7 text-center">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="absolute end-3 top-3 grid size-9 place-items-center rounded-full text-foreground/70 transition-colors hover:text-burnt"
              >
                <X className="size-5" />
              </button>
              <p className="mt-4 font-nav text-base font-semibold text-foreground">
                Delivery option is not available
              </p>
              <div className="mt-5 inline-flex min-h-12 items-center gap-3 rounded-full bg-burnt px-7 text-accent-foreground">
                <Store className="size-5" />
                <span className="eyebrow">Pickup</span>
              </div>
            </div>

            <div className="grid gap-3 px-6 py-6">
              <div className="rounded-sm bg-secondary px-4 py-3 text-sm">{PICKUP_CITY}</div>
              <div className="rounded-sm bg-secondary px-4 py-3 text-sm">{PICKUP_BRANCH}</div>
              <p className="mt-1 text-center font-nav text-sm font-semibold text-burnt">
                Pickup Closing Time: {PICKUP_CLOSING}
              </p>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
