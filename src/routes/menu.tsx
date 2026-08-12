import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProductCard } from "@/components/product/ProductCard";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { cn } from "@/lib/utils";
import type { SortKey } from "@/services/products";

interface MenuSearch {
  q?: string | undefined;
  category?: string | undefined;
  sort?: SortKey | undefined;
}

const TITLE = "Menu | Sabir Sweets & Bakers, Lahore";
const DESCRIPTION =
  "Browse mithai, cakes, fresh bakery, biscuits, desserts, namkeen, nashta and beverages from Sabir Sweets & Bakers in Lahore.";

export const Route = createFileRoute("/menu")({
  validateSearch: (search: Record<string, unknown>): MenuSearch => ({
    q: typeof search["q"] === "string" && search["q"] ? search["q"] : undefined,
    category:
      typeof search["category"] === "string" && search["category"] ? search["category"] : undefined,
    sort: ["featured", "name-asc", "name-desc"].includes(String(search["sort"]))
      ? (search["sort"] as SortKey)
      : undefined,
  }),
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/menu" },
    ],
    links: [{ rel: "canonical", href: "/menu" }],
  }),
  component: MenuPage,
});

function MenuPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/menu" });

  const results = useMemo(() => {
    let list = [...products];
    if (search.category) list = list.filter((p) => p.category === search.category);
    if (search.q) {
      const q = search.q.toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q),
      );
    }
    if (search.sort === "name-asc") list.sort((a, b) => a.name.localeCompare(b.name));
    else if (search.sort === "name-desc") list.sort((a, b) => b.name.localeCompare(a.name));
    else list.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
    return list;
  }, [search]);

  return (
    <>
      <PageHeader
        label="The Menu"
        title="Everything we make"
        intro="Search, filter and order from the full counter — mithai, bakery, nashta and more."
      />

      <div className="bg-brand-cream py-14 sm:py-20">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="grid gap-6 border-b border-brand-brown/15 pb-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div>
              <label htmlFor="menu-search" className="label-xs text-brand-brown/50">
                Search
              </label>
              <input
                id="menu-search"
                type="search"
                value={search.q ?? ""}
                onChange={(e) =>
                  navigate({
                    search: (prev: MenuSearch) => ({ ...prev, q: e.target.value || undefined }),
                    replace: true,
                  })
                }
                placeholder="Gulab jamun, patties, halwa…"
                className="mt-3 w-full border-b border-brand-brown/25 bg-transparent pb-3 font-display text-xl text-brand-brown outline-none placeholder:text-brand-brown/35 focus:border-brand-orange"
              />
            </div>
            <div>
              <label htmlFor="menu-sort" className="label-xs text-brand-brown/50">
                Sort
              </label>
              <select
                id="menu-sort"
                value={search.sort ?? "featured"}
                onChange={(e) =>
                  navigate({
                    search: (prev: MenuSearch) => ({ ...prev, sort: e.target.value as SortKey }),
                    replace: true,
                  })
                }
                className="mt-3 min-h-11 w-full border border-brand-brown/25 bg-transparent px-3 font-label text-sm text-brand-brown outline-none focus:border-brand-orange lg:w-56"
              >
                <option value="featured">Featured</option>
                <option value="name-asc">Name A–Z</option>
                <option value="name-desc">Name Z–A</option>
              </select>
            </div>
          </div>

          <ul className="no-scrollbar -mx-5 mt-8 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
            <li>
              <button
                type="button"
                onClick={() =>
                  navigate({
                    search: (prev: MenuSearch) => ({ ...prev, category: undefined }),
                    replace: true,
                  })
                }
                className={cn(
                  "label-xs min-h-11 whitespace-nowrap border px-4 text-[0.5625rem] transition-colors",
                  !search.category
                    ? "border-brand-orange bg-brand-orange text-brand-ink"
                    : "border-brand-brown/25 text-brand-brown/70 hover:border-brand-deep",
                )}
              >
                All
              </button>
            </li>
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  to="/menu/$category"
                  params={{ category: c.slug }}
                  className={cn(
                    "label-xs inline-flex min-h-11 items-center whitespace-nowrap border px-4 text-[0.5625rem] transition-colors",
                    search.category === c.slug
                      ? "border-brand-orange bg-brand-orange text-brand-ink"
                      : "border-brand-brown/25 text-brand-brown/70 hover:border-brand-deep",
                  )}
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>

          {results.length === 0 ? (
            <p className="mt-20 font-display text-2xl text-brand-brown/60">
              Nothing matched that search. Try another flavour.
            </p>
          ) : (
            <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
              {results.map((p) => (
                <ProductCard key={p.id} product={p} className="h-full" />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}