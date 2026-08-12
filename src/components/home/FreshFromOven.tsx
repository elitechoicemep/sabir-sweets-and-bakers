import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { categoryImages } from "@/data/categories";

const RAIL = [
  { name: "Patties", image: categoryImages.bakery, id: "chicken-patties" },
  { name: "Biscuits", image: categoryImages.bakery, id: "bakery-biscuits" },
  { name: "Bread", image: categoryImages.bakery, id: "fresh-bread" },
  { name: "Pastries", image: categoryImages.cakes, id: "pastries" },
  { name: "Cakes", image: categoryImages.cakes, id: "fresh-cream-cake" },
  { name: "Savoury Bakery", image: categoryImages.bakery, id: "savoury-bakery" },
];

export function FreshFromOven() {
  const railRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const onScroll = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  }, []);

  useEffect(() => {
    onScroll();
  }, [onScroll]);

  return (
    <section className="bg-brand-cream py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <SectionHeading
          label="Bakery Counter"
          title="Fresh From The Oven"
          subtitle="Baked in small batches through the day."
        />
      </div>

      <div
        ref={railRef}
        onScroll={onScroll}
        className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:gap-6 sm:px-8"
      >
        {RAIL.map((item) => (
          <Link
            key={item.name}
            to="/product/$id"
            params={{ id: item.id }}
            className="group w-[72vw] shrink-0 snap-start sm:w-[46vw] lg:w-[30vw] xl:w-[24vw]"
          >
            <div className="overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                className="aspect-3/4 w-full object-cover transition-transform duration-[1000ms] [transition-timing-function:var(--ease-cinematic)] group-hover:scale-[1.04]"
              />
            </div>
            <div className="flex items-baseline justify-between border-t border-brand-brown/15 pt-4">
              <h3 className="font-display text-xl text-brand-brown transition-colors group-hover:text-brand-deep">
                {item.name}
              </h3>
              <span className="label-xs text-[0.5rem] text-brand-orange">View</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mx-auto mt-8 max-w-[1400px] px-5 sm:px-8">
        <div className="h-px w-full max-w-xs bg-brand-brown/15" role="presentation">
          <div
            className="h-px bg-brand-orange transition-[width] duration-200"
            style={{ width: `${Math.max(12, progress * 100)}%` }}
          />
        </div>
      </div>
    </section>
  );
}