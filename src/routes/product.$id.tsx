import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { Minus, Plus, ArrowLeft, MessageCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { SIZES, products, sizeLabel, sizeLabelUr, variantProduct } from "@/data/catalog";
import { useCart } from "@/lib/cart";
import { useLanguage } from "@/lib/i18n";
import { ProductCard } from "@/components/ProductCard";
import { Ornament } from "@/components/Ornament";
import { buildWhatsAppMessage, formatPrice, whatsappUrl } from "@/utils/order";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = products.find((p) => p.id === params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Unavailable | Sabir Sweets & Bakers" }, { name: "robots", content: "noindex" }] };
    }
    const { product } = loaderData;
    return {
      meta: [
        { title: `${product.name} (${product.nameUr}) | Sabir Sweets & Bakers` },
        { name: "description", content: product.description },
        { property: "og:title", content: `${product.name} | Sabir Sweets & Bakers` },
        { property: "og:description", content: product.description },
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
            name: product.name,
            alternateName: product.nameUr,
            description: product.description,
            brand: { "@type": "Brand", name: "Sabir Sweets & Bakers" },
          }),
        },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { t, isUrdu } = useLanguage();
  const { add } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState<number>(1);
  const variant = variantProduct(product, size);

  const name = isUrdu ? product.nameUr : product.name;
  const description = isUrdu ? product.descriptionUr : product.description;
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const wa = whatsappUrl(buildWhatsAppMessage([{ product: variant, quantity }]));

  return (
    <div className="bg-background pb-24">
      <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6">
        <Link
          to="/menu"
          className="eyebrow inline-flex min-h-11 items-center gap-2 text-burnt hover:text-foreground"
        >
          <ArrowLeft className="size-4 rtl:rotate-180" />
          {t("nav.menu")}
        </Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-2">
          <div>
            <img
              src={product.image}
              alt={name}
              className="aspect-square w-full rounded-sm object-cover shadow-card"
            />
            <div className="mt-3 grid grid-cols-3 gap-3" aria-label={t("product.gallery")}>
              {[0, 1, 2].map((i) => (
                <img
                  key={i}
                  src={product.image}
                  alt=""
                  loading="lazy"
                  className="aspect-square w-full rounded-sm object-cover opacity-70"
                />
              ))}
            </div>
          </div>

          <div>
            <p className="eyebrow text-burnt">{t(`categories.${product.category}`)}</p>
            <h1 className="mt-3 font-display text-3xl sm:text-4xl">{name}</h1>
            <p className="mt-1 font-urdu text-lg text-muted-foreground">
              {isUrdu ? product.name : product.nameUr}
            </p>
            <Ornament className="mt-6 max-w-[8rem]" />

            <p className="mt-6 text-sm text-muted-foreground sm:text-base">{description}</p>
            <p className="mt-2 font-urdu text-sm text-muted-foreground">
              {isUrdu ? product.description : product.descriptionUr}
            </p>

            <dl className="mt-8 grid grid-cols-2 gap-4 border-y border-border py-5 text-sm">
              <div>
                <dt className="eyebrow text-muted-foreground">{t("product.price")}</dt>
                <dd className="mt-1 font-nav font-semibold text-burnt">{formatPrice(variant.price)}</dd>
              </div>
              <div>
                <dt className="eyebrow text-muted-foreground">{t("product.weight")}</dt>
                <dd className="mt-1">
                  {product.unit === "piece"
                    ? t("product.perPiece")
                    : isUrdu
                      ? sizeLabelUr(size)
                      : sizeLabel(size)}
                </dd>
              </div>
            </dl>

            {product.unit === "piece" ? null : (
            <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label={t("product.weight")}>
              {SIZES.map((kg) => (
                <button
                  key={kg}
                  type="button"
                  onClick={() => setSize(kg)}
                  aria-pressed={size === kg}
                  className={
                    "font-nav min-h-11 rounded-sm border px-4 text-sm transition-colors " +
                    (size === kg
                      ? "border-burnt bg-burnt text-accent-foreground"
                      : "border-border text-muted-foreground hover:border-burnt hover:text-burnt")
                  }
                >
                  {sizeLabel(kg)}
                </button>
              ))}
            </div>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <div className="flex items-center rounded-sm border border-border">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="-"
                  className="grid size-11 place-items-center hover:text-burnt"
                >
                  <Minus className="size-4" />
                </button>
                <span className="min-w-10 text-center font-nav text-sm">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="+"
                  className="grid size-11 place-items-center hover:text-burnt"
                >
                  <Plus className="size-4" />
                </button>
              </div>
              <button
                type="button"
                onClick={() => {
                  add(variant, quantity);
                  toast.success(t("product.added"), {
                    description: `${name} — ${product.unit === "piece" ? t("product.perPiece") : sizeLabel(size)}`,
                  });
                }}
                className="eyebrow inline-flex min-h-12 items-center rounded-sm bg-ink px-6 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                {t("product.add")}
              </button>
              {wa ? (
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="eyebrow inline-flex min-h-12 items-center gap-2 rounded-sm border border-burnt/40 px-5 text-burnt transition-colors hover:bg-burnt hover:text-accent-foreground"
                >
                  <MessageCircle className="size-4" />
                  {t("product.whatsapp")}
                </a>
              ) : null}
            </div>
          </div>
        </div>

        {related.length > 0 ? (
          <section className="mt-20">
            <h2 className="text-2xl sm:text-3xl">{t("product.related")}</h2>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} className="h-full" />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
