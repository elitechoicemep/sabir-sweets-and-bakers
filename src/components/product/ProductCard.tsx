import { Link } from "@tanstack/react-router";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/config";
import { getCategory } from "@/data/categories";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";

export function ProductCard({ product, className }: { product: Product; className?: string }) {
  const { add } = useCart();
  const category = getCategory(product.category);

  return (
    <article
      className={cn(
        "group flex flex-col border border-brand-brown/15 bg-brand-cream transition-[transform,border-color] duration-500 [transition-timing-function:var(--ease-cinematic)] hover:-translate-y-1 hover:border-brand-deep/50",
        className,
      )}
    >
      <Link
        to="/product/$id"
        params={{ id: product.id }}
        className="relative block overflow-hidden"
        aria-label={`View ${product.name}`}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="aspect-4/5 w-full object-cover transition-transform duration-[900ms] [transition-timing-function:var(--ease-cinematic)] group-hover:scale-[1.03]"
        />
        {product.bestSeller ? (
          <span className="label-xs absolute left-0 top-0 bg-brand-orange px-2.5 py-1.5 text-[0.5rem] text-brand-ink">
            Loved
          </span>
        ) : null}
        <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-brand-orange transition-[width] duration-700 [transition-timing-function:var(--ease-cinematic)] group-hover:w-full" />
      </Link>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="label-xs text-[0.5rem] text-brand-brown/45">{category?.name}</p>
        <h3 className="mt-2 font-display text-lg leading-tight text-brand-brown transition-colors duration-300 group-hover:text-brand-deep sm:text-xl">
          <Link to="/product/$id" params={{ id: product.id }}>
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-brand-brown/60">
          {product.description}
        </p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <span className="label-xs text-brand-orange">{formatPrice(product.price)}</span>
          <button
            type="button"
            onClick={() => add(product)}
            className="label-xs min-h-11 bg-brand-orange px-3 text-[0.5625rem] text-brand-ink transition-colors duration-400 hover:bg-brand-deep hover:text-brand-cream"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}