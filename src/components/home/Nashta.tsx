import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/ui/Reveal";
import { buttonClass } from "@/components/ui/BrandButton";
import nashta from "@/assets/cat-nashta.jpg";

const ITEMS = ["Halwa", "Puri", "Chana", "Paratha", "Chai", "Daily breakfast plates"];

export function Nashta() {
  return (
    <section className="bg-brand-brown py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_0.95fr] lg:items-center">
        <Reveal>
          <p className="label-xs text-brand-orange">Nashta</p>
          <h2 className="mt-6 font-display text-[clamp(2.2rem,6vw,4.4rem)] leading-[0.98] tracking-[-0.02em] text-brand-cream">
            Start your day
            <br />
            the Lahore way
          </h2>
          <p className="mt-7 max-w-md text-base leading-relaxed text-brand-cream/75">
            Warm, comforting and freshly prepared.
          </p>
          <ul className="mt-10 grid max-w-md grid-cols-2 gap-x-6">
            {ITEMS.map((item) => (
              <li
                key={item}
                className="border-b border-brand-cream/12 py-3.5 font-label text-sm text-brand-cream/85"
              >
                <span className="mr-3 text-brand-orange">—</span>
                {item}
              </li>
            ))}
          </ul>
          <Link
            to="/menu/$category"
            params={{ category: "nashta" }}
            className={buttonClass("primary", "lg", "mt-11")}
          >
            View Nashta Menu
          </Link>
        </Reveal>

        <Reveal delay={0.1}>
          <img
            src={nashta}
            alt="Pakistani breakfast spread with halwa, puri, chana and chai"
            loading="lazy"
            className="aspect-4/5 w-full object-cover lg:aspect-4/5"
          />
        </Reveal>
      </div>
    </section>
  );
}