import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProductCard } from "@/components/product/ProductCard";
import { categories, getCategory } from "@/data/categories";
import { products } from "@/data/products";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/menu/$category")({
  loader: ({ params }) => {
    const category = getCategory(params.category);
    if (!category) throw notFound();
    return { category, items: products.filter((p) => p.category === category.slug) };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.category.name} | Sabir Sweets & Bakers`;
    const description = `${loaderData.category.name} — ${loaderData.category.tagline} from Sabir Sweets & Bakers in Lahore.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: `/menu/${params.category}` },
      ],
      links: [{ rel: "canonical", href: `/menu/${params.category}` }],
    };
  },
  notFoundComponent: CategoryNotFound,
  component: CategoryPage,
});

function CategoryPage() {
  const { category, items } = Route.useLoaderData();

  return (
    <>
      <PageHeader label="Menu" title={category.name} intro={category.tagline} />
      <div className="bg-brand-cream py-14 sm:py-20">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <ul className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-10 sm:mx-0 sm:flex-wrap sm:px-0">
            <li>
              <Link
                to="/menu"
                className="label-xs inline-flex min-h-11 items-center whitespace-nowrap border border-brand-brown/25 px-4 text-[0.5625rem] text-brand-brown/70 transition-colors hover:border-brand-deep"
              >
                All
              </Link>
            </li>
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  to="/menu/$category"
                  params={{ category: c.slug }}
                  className={cn(
                    "label-xs inline-flex min-h-11 items-center whitespace-nowrap border px-4 text-[0.5625rem] transition-colors",
                    c.slug === category.slug
                      ? "border-brand-orange bg-brand-orange text-brand-ink"
                      : "border-brand-brown/25 text-brand-brown/70 hover:border-brand-deep",
                  )}
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>

          {items.length === 0 ? (
            <p className="font-display text-2xl text-brand-brown/60">
              This part of the counter is being updated. Please check back soon.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
              {items.map((p: Product) => (
                <ProductCard key={p.id} product={p} className="h-full" />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function CategoryNotFound() {
  return (
    <div className="bg-brand-cream px-5 pb-24 pt-44 text-center">
      <h1 className="font-display text-4xl text-brand-brown">Category not found</h1>
      <Link to="/menu" className="label-xs mt-6 inline-block text-brand-deep">
        Back to the menu
      </Link>
    </div>
  );
}