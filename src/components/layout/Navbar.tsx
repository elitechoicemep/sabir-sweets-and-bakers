import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/lib/cart";
import { useLanguage } from "@/lib/i18n";
import { products } from "@/data/catalog";
import { searchProducts } from "@/services/products";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", key: "nav.home" },
  { to: "/menu", key: "nav.menu" },
  { to: "/about", key: "nav.about" },
  { to: "/contact", key: "nav.contact" },
] as const;

export function Navbar() {
  const { t, tUr } = useLanguage();
  const { count, openCart } = useCart();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const overHero = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  const closeSearch = () => {
    setSearchOpen(false);
    setQuery("");
  };

  const submitSearch = () => {
    const q = query.trim();
    if (!q) {
      closeSearch();
      return;
    }
    setSearchOpen(false);
    setQuery("");
    navigate({ to: "/menu", search: { q } });
  };

  const solid = scrolled || !overHero;
  const results = query ? searchProducts(products, query).slice(0, 6) : [];


  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="bg-ink text-primary">
        <p className="eyebrow mx-auto max-w-7xl px-4 py-2 text-center text-[0.625rem] sm:text-[0.6875rem]">
          {t("announcement")}
        </p>
      </div>

      <div
        className={cn(
          "border-b transition-all duration-500",
          solid
            ? "border-border bg-background/95 backdrop-blur-md"
            : "border-transparent bg-transparent",
        )}
      >
        <nav
          className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6"
          aria-label={t("nav.menu")}
        >
          <Link to="/" className="flex shrink-0 items-center gap-2.5 focus-visible:outline-none">
            <span className="min-w-0">
              <span
                className={cn(
                  "block truncate font-display text-base leading-tight sm:text-lg",
                  solid ? "text-foreground" : "text-beige",
                )}
              >
                {t("brand.name")}
              </span>
            </span>
          </Link>

          <ul className="ms-auto hidden items-center gap-7 lg:flex">
            {links.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={cn(
                    "font-nav text-xs font-semibold tracking-[0.14em] uppercase transition-colors",
                    solid ? "text-foreground hover:text-burnt" : "text-beige hover:text-primary",
                  )}
                  activeProps={{ className: "text-burnt" }}
                  activeOptions={{ exact: link.to === "/" }}
                >
                  {t(link.key)}
                </Link>
              </li>
            ))}
          </ul>

          <div className={cn("flex items-center gap-1 lg:ms-6", "ms-auto lg:ms-6")}>
            <button
              type="button"
              onClick={() => setSearchOpen((s) => !s)}
              aria-label={t("nav.search")}
              aria-expanded={searchOpen}
              className={cn(
                "grid size-11 place-items-center rounded-sm transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                solid ? "text-foreground hover:text-burnt" : "text-beige hover:text-primary",
              )}
            >
              <Search className="size-[1.15rem]" />
            </button>

            <button
              type="button"
              onClick={openCart}
              aria-label={`${t("nav.cart")} (${count})`}
              className={cn(
                "relative grid size-11 place-items-center rounded-sm transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                solid ? "text-foreground hover:text-burnt" : "text-beige hover:text-primary",
              )}
            >
              <ShoppingBag className="size-[1.15rem]" />
              {count > 0 ? (
                <span className="absolute -top-0.5 end-0.5 grid min-w-5 place-items-center rounded-full bg-primary px-1 font-nav text-[0.625rem] font-bold text-primary-foreground">
                  {count}
                </span>
              ) : null}
            </button>

            <Link
              to="/menu"
              className="eyebrow hidden min-h-11 items-center rounded-sm bg-primary px-4 text-primary-foreground transition-colors hover:bg-burnt hover:text-accent-foreground md:inline-flex"
            >
              <span>{t("nav.order")}</span>
              <span className="ms-2 font-urdu text-sm tracking-normal normal-case">
                {tUr("nav.order")}
              </span>
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? t("nav.closeMenu") : t("nav.openMenu")}
              aria-expanded={mobileOpen}
              className={cn(
                "grid size-11 place-items-center rounded-sm transition-colors lg:hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                solid ? "text-foreground" : "text-beige",
              )}
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>

        {searchOpen ? (
          <div className="max-h-[calc(100svh-8rem)] overflow-y-auto border-t border-border bg-background/98 backdrop-blur-md overscroll-contain">
            <div className="mx-auto max-w-3xl px-4 py-5 sm:px-6">

              <div className="flex items-center justify-between gap-3">
                <label className="eyebrow text-burnt" htmlFor="nav-search">
                  {t("nav.search")}
                </label>
                <button
                  type="button"
                  onClick={closeSearch}
                  aria-label={t("nav.closeMenu")}
                  className="grid size-9 place-items-center rounded-sm text-muted-foreground transition-colors hover:text-burnt focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  <X className="size-4" />
                </button>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  submitSearch();
                }}
                className="mt-2 flex gap-2"
              >
                <input
                  id="nav-search"
                  ref={inputRef}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") closeSearch();
                  }}
                  placeholder={t("menu.searchPlaceholder")}
                  autoComplete="off"
                  className="w-full rounded-sm border border-input bg-card px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                />
                <button
                  type="submit"
                  className="eyebrow shrink-0 rounded-sm bg-primary px-4 text-primary-foreground transition-colors hover:bg-burnt hover:text-accent-foreground"
                >
                  {t("nav.search")}
                </button>
              </form>

              {query ? (
                <ul className="mt-3 divide-y divide-border">
                  {results.length === 0 ? (
                    <li className="py-3 text-sm text-muted-foreground">{t("menu.empty")}</li>
                  ) : (
                    results.map((p) => (
                      <li key={p.id}>
                        <Link
                          to="/product/$id"
                          params={{ id: p.id }}
                          onClick={closeSearch}
                          className="flex items-center gap-3 py-3 transition-colors hover:text-burnt"
                        >
                          <img src={p.image} alt="" loading="lazy" className="size-12 shrink-0 rounded-sm object-cover" />
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm leading-6">{p.name}</span>
                            <span className="block truncate font-urdu text-xs leading-6 text-muted-foreground">
                              {p.nameUr}
                            </span>
                          </span>

                        </Link>
                      </li>
                    ))
                  )}
                </ul>
              ) : null}
            </div>
          </div>
        ) : null}

        {mobileOpen ? (
          <div className="border-t border-border bg-background lg:hidden">
            <ul className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
              {links.map((link) => (
                <li key={link.to} className="border-b border-border/70 last:border-0">
                  <Link
                    to={link.to}
                    className="block py-3.5 font-nav text-sm font-semibold tracking-wider uppercase text-foreground"
                    activeProps={{ className: "text-burnt" }}
                    activeOptions={{ exact: link.to === "/" }}
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </header>
  );
}
