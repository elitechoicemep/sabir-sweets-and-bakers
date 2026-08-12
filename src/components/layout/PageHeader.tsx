import { Reveal } from "@/components/ui/Reveal";

export function PageHeader({
  label,
  title,
  intro,
}: {
  label: string;
  title: string;
  intro?: string;
}) {
  return (
    <header className="bg-brand-brown px-5 pb-16 pt-36 sm:px-8 sm:pb-24 sm:pt-44">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <p className="label-xs text-brand-orange">{label}</p>
          <h1 className="mt-6 font-display text-[clamp(2.4rem,8vw,6rem)] leading-[0.94] tracking-[-0.03em] text-brand-cream">
            {title}
          </h1>
          {intro ? (
            <p className="mt-7 max-w-xl text-base leading-relaxed text-brand-cream/70">{intro}</p>
          ) : null}
        </Reveal>
      </div>
    </header>
  );
}