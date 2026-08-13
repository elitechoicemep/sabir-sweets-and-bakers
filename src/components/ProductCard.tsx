import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart";
import { useLanguage } from "@/lib/i18n";
import { SIZES, sizeLabel, variantProduct } from "@/data/catalog";
import { formatPrice } from "@/utils/order";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

export function ProductCard({ product, className }: { product: Product; className?: string }) {
  const { t, isUrdu } = useLanguage();
  const { add } = useCart();
  const [size, setSize] = useState<number>(1);

  const name = isUrdu ? product.nameUr : product.name;
  const secondary = isUrdu ? product.name : product.nameUr;
  const variant = variantProduct(product, size);

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-sm border border-border bg-card shadow-card transition-shadow duration-500 hover:shadow-lift",
        className,
      )}
    >
      <div className="relative aspect-4/3 overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={name}
          loading="lazy"
          width={1024}
          height={768}
          className="size-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brown/45 via-transparent to-transparent opacity-70" />
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-5">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2 sm:gap-3">
          <h3 className="min-w-0 text-base leading-snug sm:text-lg">
            <Link
              to="/product/$id"
              params={{ id: product.id }}
              className="transition-colors hover:text-burnt focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              {name}
            </Link>
          </h3>
          <span
            className={cn(
              "shrink-0 text-xs text-muted-foreground sm:text-sm",
              !isUrdu && "font-urdu",
            )}
          >
            {secondary}
          </span>
        </div>

        {product.unit === "piece" ? (
          <p className="eyebrow mt-3 text-muted-foreground">{t("product.perPiece")}</p>
        ) : (
        <div
          className="mt-3 flex gap-1"
          role="group"
          aria-label={t("product.weight")}
        >
          {SIZES.map((kg) => (
            <button
              key={kg}
              type="button"
              onClick={() => setSize(kg)}
              aria-pressed={size === kg}
              className={cn(
                "font-nav min-h-9 flex-1 rounded-sm border px-1.5 text-[0.7rem] whitespace-nowrap transition-colors",
                size === kg
                  ? "border-burnt bg-burnt text-accent-foreground"
                  : "border-border text-muted-foreground hover:border-burnt hover:text-burnt",
              )}
            >
              {sizeLabel(kg)}
            </button>
          ))}
        </div>
        )}

        <div className="mt-auto flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-nav text-sm font-semibold text-burnt">{formatPrice(variant.price)}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              add(variant);
              toast.success(t("product.added"), {
                description: `${name} — ${product.unit === "piece" ? t("product.perPiece") : sizeLabel(size)}`,
              });
            }}
            className="eyebrow inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-sm bg-ink px-3 text-[0.625rem] text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none sm:w-auto sm:px-3.5 sm:text-[0.6875rem]"
          >
            <Plus className="size-3.5 shrink-0" />
            <span className="whitespace-nowrap">{t("product.add")}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
