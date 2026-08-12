import { Link } from "@tanstack/react-router";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { categories } from "@/data/categories";
import { cn } from "@/lib/utils";

const LAYOUT: { slug: string; className: string; ratio: string }[] = [
  { slug: "mithai", className: "lg:col-span-7 lg:row-span-2", ratio: "aspect-4/5 lg:aspect-3/4" },
  { slug: "cakes", className: "lg:col-span-5", ratio: "aspect-4/3" },
  { slug: "bakery", className: "lg:col-span-5", ratio: "aspect-4/3" },
  { slug: "namkeen", className: "lg:col-span-4", ratio: "aspect-square" },
  { slug: "desserts", className: "lg:col-span-4", ratio: "aspect-square" },
  { slug: "nashta", className: "lg:col-span-4", ratio: "aspect-square" },
];

export function Signatures() {
  return (
    <section className="bg-brand-cream py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <SectionHeading
          label="Signature Collection"
          title="Our Signatures"
          subtitle="Some flavours become traditions."
        />

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-12">
          {LAYOUT.map((item, i) => {
            const category = categories.find((c) => c.slug === item.slug);
            if (!category) return null;
            return (
              <Reveal key={item.slug} delay={i * 0.06} className={cn(item.className)}>
                <Link
                  to="/menu/$category"
                  params={{ category: category.slug }}
                  className="group block h-full"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      loading="lazy"
                      className={cn(
                        "w-full object-cover transition-transform duration-[1100ms] [transition-timing-function:var(--ease-cinematic)] group-hover:scale-[1.04]",
                        item.ratio,
                      )}
                    />
                    <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-brand-orange transition-[width] duration-700 [transition-timing-function:var(--ease-cinematic)] group-hover:w-full" />
                  </div>
                  <div className="flex items-baseline justify-between gap-4 pt-4">
                    <h3 className="font-display text-2xl text-brand-brown transition-colors duration-400 group-hover:text-brand-deep sm:text-3xl">
                      {category.name}
                    </h3>
                    <span className="label-xs text-[0.5rem] text-brand-brown/45">
                      {category.tagline}
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}