import { Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/cakes", label: "Cakes" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { count, openCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchOpen(false);
    setMobileOpen(false);
    navigate({ to: "/menu", search: { q: query || undefined, category: undefined } });
  };

  const light = !scrolled;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="bg-brand-brown text-brand-cream/80">
        <p className="label-xs py-2 text-center text-[0.5625rem] sm:text-[0.625rem]">
          Freshly made daily • Lahore
        </p>
      </div>

      <div
        className={cn(
          "transition-all duration-700 [transition-timing-function:var(--ease-cinematic)]",
          scrolled
            ? "bg-brand-cream text-brand-brown shadow-[0_1px_0_rgba(77,40,31,0.14)]"
            : "bg-brand-brown/85 text-brand-cream backdrop-blur-[2px]",
        )}
      >
        <nav
          aria-label="Main"
          className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-4 sm:px-8"
        >
          <Link to="/" className="min-w-0 leading-none" aria-label="Sabir Sweets & Bakers — home">
            <span className="block font-display text-lg tracking-[-0.01em] sm:text-xl">
              Sabir<span className="text-brand-orange"> Sweets</span>
            </span>
            <span className="label-xs mt-1 block text-[0.5rem] opacity-60">& Bakers • Lahore</span>
          </Link>

          <ul className="hidden items-center gap-9 lg:flex">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  activeOptions={{ exact: item.to === "/" }}
                  activeProps={{ className: "text-brand-orange" }}
                  className={cn(
                    "label-xs relative py-1 transition-colors duration-300 hover:text-brand-orange",
                    "after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-brand-orange after:transition-[width] after:duration-500 hover:after:w-full",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="Search the menu"
              aria-expanded={searchOpen}
              className="grid h-11 w-11 place-items-center transition-colors hover:text-brand-orange"
            >
              <Search className="h-[18px] w-[18px]" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={openCart}
              aria-label={`Open basket, ${count} item${count === 1 ? "" : "s"}`}
              className="relative grid h-11 w-11 place-items-center transition-colors hover:text-brand-orange"
            >
              <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.5} />
              {count > 0 ? (
                <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-brand-orange px-1 font-label text-[0.5625rem] font-semibold text-brand-ink">
                  {count}
                </span>
              ) : null}
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              className="grid h-11 w-11 place-items-center transition-colors hover:text-brand-orange lg:hidden"
            >
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
        </nav>

        <AnimatePresence initial={false}>
          {searchOpen ? (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden border-t border-current/10"
            >
              <form onSubmit={submitSearch} className="mx-auto max-w-[1400px] px-5 py-4 sm:px-8">
                <label htmlFor="nav-search" className="sr-only">
                  Search products
                </label>
                <input
                  id="nav-search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search mithai, cakes, bakery…"
                  className="w-full border-b border-current/25 bg-transparent pb-3 font-display text-xl outline-none placeholder:text-current/40 focus:border-brand-orange"
                />
              </form>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-brand-brown text-brand-cream lg:hidden"
          >
            <div className="flex items-center justify-between px-5 py-5">
              <span className="font-display text-lg">Menu</span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close navigation menu"
                className="grid h-11 w-11 place-items-center"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>
            <ul className="px-5 pt-6">
              {NAV.map((item, i) => (
                <motion.li
                  key={item.to}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b border-brand-cream/12"
                >
                  <Link
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    activeOptions={{ exact: item.to === "/" }}
                    activeProps={{ className: "text-brand-orange" }}
                    className="block py-5 font-display text-3xl"
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="px-5 pt-8">
              <Link
                to="/cart"
                onClick={() => setMobileOpen(false)}
                className="label-xs text-brand-orange"
              >
                View basket ({count})
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}