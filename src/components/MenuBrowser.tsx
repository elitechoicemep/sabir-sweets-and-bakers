import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { categories, products } from "@/data/catalog";
import { searchProducts } from "@/services/products";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/Ornament";
import { cn } from "@/lib/utils";
import type { CategoryId } from "@/types";

export function MenuBrowser({
  activeCategory,
  initialQuery = "",
}: {
  activeCategory?: CategoryId;
  initialQuery?: string;
}) {
  const { t, isUrdu } = useLanguage();
  const [query, setQuery] = useState(initialQuery);
  const [sort, setSort] = useState<"featured" | "az" | "za">("featured");

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const results = useMemo(() => {
    let list = activeCategory ? products.filter((p) => p.category === activeCategory) : products;
    list = searchProducts(list, query);
    const key = (p: (typeof products)[number]) => (isUrdu ? p.nameUr : p.name);
    if (sort === "az") list = [...list].sort((a, b) => key(a).localeCompare(key(b)));
    if (sort === "za") list = [...list].sort((a, b) => key(b).localeCompare(key(a)));
    if (sort === "featured") list = [...list].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    return list;
  }, [activeCategory, query, sort, isUrdu]);

  return (
    <div className="bg-background pb-24">
      <div className="jaali border-b border-border bg-secondary/40 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="Menu" title={t("menu.title")} subtitle={t("menu.subtitle")} />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="sticky top-[4.75rem] z-30 -mx-4 bg-background/95 px-4 py-4 backdrop-blur sm:-mx-6 sm:px-6">
          <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
            <label className="relative block">
              <span className="sr-only">{t("nav.search")}</span>
              <Search
                className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("menu.searchPlaceholder")}
                className="min-h-11 w-full rounded-sm border border-input bg-card ps-10 pe-3 text-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              />
            </label>
            <label className="flex items-center gap-2">
              <span className="eyebrow shrink-0 text-muted-foreground">{t("menu.sort")}</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as typeof sort)}
                className="min-h-11 rounded-sm border border-input bg-card px-3 text-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                <option value="featured">{t("menu.sortDefault")}</option>
                <option value="az">{t("menu.sortAz")}</option>
                <option value="za">{t("menu.sortZa")}</option>
              </select>
            </label>
          </div>

          <ul className="mt-4 -mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:flex-wrap sm:px-0">
            <li>
              <Link
                to="/menu"
                className={cn(
                  "eyebrow inline-flex min-h-10 items-center rounded-sm border px-3 whitespace-nowrap transition-colors",
                  activeCategory
                    ? "border-border text-muted-foreground hover:text-burnt"
                    : "border-primary bg-primary text-primary-foreground",
                )}
              >
                {t("menu.all")}
              </Link>
            </li>
            {categories.map((c) => (
              <li key={c.id}>
                <Link
                  to="/menu/$category"
                  params={{ category: c.id }}
                  className={cn(
                    "eyebrow inline-flex min-h-10 items-center rounded-sm border px-3 whitespace-nowrap transition-colors",
                    activeCategory === c.id
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground hover:text-burnt",
                  )}
                >
                  {isUrdu ? c.nameUr : c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          {results.length} {t("menu.results")}
        </p>

        {results.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-base text-muted-foreground">{t("menu.empty")}</p>
            <button
              type="button"
              onClick={() => setQuery("")}
              className="eyebrow mt-5 inline-flex min-h-11 items-center rounded-sm border border-burnt/40 px-5 text-burnt hover:bg-burnt hover:text-accent-foreground"
            >
              {t("menu.clear")}
            </button>
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
            {results.map((p) => (
              <ProductCard key={p.id} product={p} className="h-full" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
