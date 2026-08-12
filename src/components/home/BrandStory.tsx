import { Reveal } from "@/components/ui/Reveal";
import story from "@/assets/story.jpg";

const PILLARS = [
  { title: "Tradition", body: "Recipes made the way they have always been made." },
  { title: "Freshness", body: "Prepared in small batches, every single day." },
  { title: "Craftsmanship", body: "Attention in the mixing, the frying, the finishing." },
  { title: "Lahore", body: "Made for the celebrations of this city." },
];

export function BrandStory() {
  return (
    <section className="bg-brand-cream py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <Reveal className="max-w-4xl">
          <p className="label-xs text-brand-deep">Our Story</p>
          <h2 className="mt-6 font-display text-[clamp(2.3rem,7.5vw,6rem)] leading-[0.94] tracking-[-0.03em] text-brand-brown">
            A taste worth
            <br />
            remembering
          </h2>
        </Reveal>
      </div>

      <Reveal delay={0.08} className="mt-16">
        <img
          src={story}
          alt="The Sabir Sweets & Bakers counter, filled with freshly prepared mithai"
          loading="lazy"
          className="aspect-4/3 w-full object-cover sm:aspect-21/9"
        />
      </Reveal>

      <div className="mx-auto mt-16 max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <p className="max-w-xl font-display text-[clamp(1.25rem,2.6vw,1.9rem)] leading-[1.3] text-brand-brown">
              Sweets are how this city marks its moments — an engagement, an exam result, a guest at
              the door. We make ours to be worthy of those moments.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <dl className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {PILLARS.map((p) => (
                <div key={p.title} className="border-t border-brand-brown/20 pt-4">
                  <dt className="label-xs text-brand-deep">{p.title}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-brand-brown/70">{p.body}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}