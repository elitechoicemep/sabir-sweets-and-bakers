import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProductCard } from "@/components/product/ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import { buttonClass } from "@/components/ui/BrandButton";
import { products } from "@/data/products";

const TITLE = "Custom & Celebration Cakes | Sabir Sweets & Bakers, Lahore";
const DESCRIPTION =
  "Birthday, anniversary, wedding and corporate cakes made to order by Sabir Sweets & Bakers in Lahore.";

const OCCASIONS = [
  { name: "Birthday", body: "Classic sponges and fresh cream finishes for every age." },
  { name: "Anniversary", body: "Quiet, elegant cakes for the years worth marking." },
  { name: "Wedding", body: "Tiered centrepieces prepared to your brief." },
  { name: "Corporate", body: "Branded cakes and boxed orders for the office." },
  { name: "Custom Design", body: "Tell us the idea and we will bake toward it." },
];

export const Route = createFileRoute("/cakes")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/cakes" },
    ],
    links: [{ rel: "canonical", href: "/cakes" }],
  }),
  component: CakesPage,
});

function CakesPage() {
  const cakes = products.filter((p) => p.category === "cakes");

  return (
    <>
      <PageHeader
        label="Cakes"
        title="Made for your moments"
        intro="Birthdays, anniversaries, weddings, corporate celebrations — make every occasion a little sweeter."
      />

      <section className="bg-brand-cream py-20">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {OCCASIONS.map((o, i) => (
              <Reveal key={o.name} delay={i * 0.05}>
                <div className="border-t border-brand-brown/20 pt-5">
                  <dt className="font-display text-2xl text-brand-brown">{o.name}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-brand-brown/65">{o.body}</dd>
                </div>
              </Reveal>
            ))}
          </dl>

          <div className="mt-16 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
            {cakes.map((p) => (
              <ProductCard key={p.id} product={p} className="h-full" />
            ))}
          </div>

          <div className="mt-14">
            <Link to="/contact" className={buttonClass("primary", "lg")}>
              Request a Custom Cake
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}