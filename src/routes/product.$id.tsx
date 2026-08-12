import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { products } from "@/data/products";
import { getCategory } from "@/data/categories";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/config";
import { buttonClass } from "@/components/ui/BrandButton";
import { ProductCard } from "@/components/product/ProductCard";
import { buildOrderMessage, whatsappLink } from "@/utils/whatsapp";
import type { Product } from "@/types";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = products.find((p) => p.id === params.id);
    if (!product) throw notFound();
    const related = products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
    return { product, related };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.product.name} | Sabir Sweets & Bakers`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.product.description },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.product.description },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `/product/${params.id}` },
      ],
      links: [{ rel: "canonical", href: `/product/${params.id}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: loaderData.product.name,
            description: loaderData.product.description,
            brand: { "@type": "Brand", name: "Sabir Sweets & Bakers" },
          }),
        },
      ],
    };
  },
  notFoundComponent: ProductNotFound,
  component: ProductPage,
});

function ProductPage() {
  const { product, related } = Route.useLoaderData();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const category = getCategory(product.category);

  const wa = whatsappLink(
    buildOrderMessage({
      lines: [{ product, quantity: qty }],
      subtotal: null,
      delivery: null,
      total: null,
    }),
  );

  return (
    <>
      <div className="bg-brand-cream pb-20 pt-32 sm:pt-40">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-5 sm:px-8 lg:grid-cols-2">
          <div>
            <img
              src={product.image}
              alt={product.name}
              className="aspect-4/5 w-full object-cover"
            />
            <div className="mt-3 grid grid-cols-3 gap-3">
              {[product.image, product.image, product.image].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`${product.name} view ${i + 1}`}
                  loading="lazy"
                  className="aspect-square w-full object-cover opacity-70"
                />
              ))}
            </div>
          </div>

          <div className="lg:pt-6">
            <Link
              to="/menu/$category"
              params={{ category: product.category }}
              className="label-xs text-brand-deep"
            >
              {category?.name}
            </Link>
            <h1 className="mt-5 font-display text-[clamp(2.2rem,6vw,4rem)] leading-[1] tracking-[-0.02em] text-brand-brown">
              {product.name}
            </h1>
            <p className="label-xs mt-6 text-brand-orange">{formatPrice(product.price)}</p>
            <p className="mt-6 max-w-md text-base leading-relaxed text-brand-brown/70">
              {product.description}
            </p>
            <dl className="mt-8 border-t border-brand-brown/15 pt-5 font-label text-sm text-brand-brown/70">
              <div className="flex justify-between py-2">
                <dt>Weight</dt>
                <dd>{product.weight ?? "—"}</dd>
              </div>
              <div className="flex justify-between border-t border-brand-brown/10 py-2">
                <dt>Price</dt>
                <dd>{formatPrice(product.price)}</dd>
              </div>
            </dl>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center border border-brand-brown/25">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="grid h-12 w-12 place-items-center text-brand-brown hover:bg-brand-orange"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center font-label text-sm text-brand-brown">{qty}</span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQty((q) => q + 1)}
                  className="grid h-12 w-12 place-items-center text-brand-brown hover:bg-brand-orange"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button
                type="button"
                onClick={() => add(product, qty)}
                className={buttonClass("primary", "lg")}
              >
                Add to Cart
              </button>
              {wa ? (
                <a
                  href={wa}
                  target="_blank"
                  rel="noreferrer"
                  className={buttonClass("secondary", "lg")}
                >
                  Order on WhatsApp
                </a>
              ) : null}
            </div>
            {!wa ? (
              <p className="mt-4 text-xs text-brand-brown/50">
                WhatsApp ordering activates once VITE_WHATSAPP_NUMBER is configured.
              </p>
            ) : null}
          </div>
        </div>
      </div>

      {related.length ? (
        <section className="bg-white py-20">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
            <h2 className="font-display text-3xl text-brand-brown">You may also like</h2>
            <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
              {related.map((p: Product) => (
                <ProductCard key={p.id} product={p} className="h-full" />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}

function ProductNotFound() {
  return (
    <div className="bg-brand-cream px-5 pb-24 pt-44 text-center">
      <h1 className="font-display text-4xl text-brand-brown">Product not found</h1>
      <Link to="/menu" className="label-xs mt-6 inline-block text-brand-deep">
        Back to the menu
      </Link>
    </div>
  );
}