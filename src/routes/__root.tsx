import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { LanguageProvider } from "@/lib/i18n";
import { CartProvider } from "@/lib/cart";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Toaster } from "@/components/ui/sonner";
import { ADDRESS_EN, MAPS_URL, PHONE_INTL } from "@/utils/order";

function NotFoundComponent() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl text-foreground">404</h1>
        <h2 className="mt-4 text-xl text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="eyebrow inline-flex min-h-11 items-center justify-center rounded-sm bg-primary px-5 text-primary-foreground transition-colors hover:bg-burnt hover:text-accent-foreground"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl tracking-tight text-foreground">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="eyebrow inline-flex min-h-11 items-center justify-center rounded-sm bg-primary px-5 text-primary-foreground transition-colors hover:bg-burnt hover:text-accent-foreground"
          >
            Try again
          </button>
          <a
            href="/"
            className="eyebrow inline-flex min-h-11 items-center justify-center rounded-sm border border-input bg-background px-5 text-foreground transition-colors hover:bg-secondary"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Sabir Sweets & Bakers | Traditional Sweets & Bakery in Lahore" },
      {
        name: "description",
        content:
          "Discover traditional Pakistani mithai, fresh bakery favourites, cakes and more from Sabir Sweets & Bakers in Lahore.",
      },
      { property: "og:site_name", content: "Sabir Sweets & Bakers" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#F0EAD6" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..800;1,400..700&family=Poppins:wght@300;400;500;600&family=Montserrat:wght@500;600;700&family=Noto+Nastaliq+Urdu:wght@400..700&family=Noto+Naskh+Arabic:wght@400..700&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Bakery",
          name: "Sabir Sweets & Bakers",
          description:
            "Traditional Pakistani mithai, fresh bakery items, cakes and desi nashta in Lahore.",
          address: {
            "@type": "PostalAddress",
            streetAddress: "H79Q+RFP, Outfall Rd, St Nagar",
            addressLocality: "Lahore",
            postalCode: "54000",
            addressCountry: "PK",
          },
          geo: { "@type": "GeoCoordinates", latitude: 31.5695928, longitude: 74.2887133 },
          telephone: PHONE_INTL,
          openingHours: ["Mo-Fr 06:00-01:00", "Sa-Su 06:30-00:00"],
          hasMap: MAPS_URL,
          servesCuisine: "Pakistani",
          areaServed: "Lahore",
          slogan: "Tradition in Every Bite.",
          knowsLanguage: ["en", "ur"],
          address_note: ADDRESS_EN,

        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <CartProvider>
          <SmoothScroll />
          <div className="flex min-h-dvh flex-col">
            <Navbar />
            <main className="flex-1 pt-[4.75rem] sm:pt-[5rem]">
              {/* Required: nested routes render here. */}
              <Outlet />
            </main>
            <Footer />
          </div>
          <CartDrawer />
          <Toaster />
        </CartProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}
