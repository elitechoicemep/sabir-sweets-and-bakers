import { Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

/** Placeholder copy — replaced once real, verified customer reviews are supplied. */
const DEMO_REVIEWS = [
  {
    quote: "Sample review text used to show the layout of this section.",
    name: "Demo review",
  },
  {
    quote: "Placeholder content until verified customer reviews are collected.",
    name: "Demo review",
  },
  {
    quote: "Example wording only — not an actual customer testimonial.",
    name: "Demo review",
  },
];

export function Reviews() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <SectionHeading label="Reviews" title="Loved by our customers" />
        <p className="label-xs mt-6 text-[0.5625rem] text-brand-brown/45">
          Demo content — placeholder reviews shown until verified customer feedback is provided.
        </p>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {DEMO_REVIEWS.map((r, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <figure className="flex h-full flex-col border border-brand-brown/15 bg-brand-cream p-7">
                <div className="flex gap-1" aria-label="Five out of five stars, demo rating">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      className="h-3.5 w-3.5 fill-brand-orange text-brand-orange"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <blockquote className="mt-6 font-display text-xl leading-snug text-brand-brown">
                  “{r.quote}”
                </blockquote>
                <figcaption className="label-xs mt-auto pt-8 text-[0.5rem] text-brand-brown/45">
                  {r.name}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}