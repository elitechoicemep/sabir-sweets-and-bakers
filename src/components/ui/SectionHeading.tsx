import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function SectionHeading({
  label,
  title,
  subtitle,
  tone = "dark",
  align = "left",
  className,
}: {
  label?: string;
  title: string;
  subtitle?: string;
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
}) {
  const light = tone === "light";
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {label ? (
        <p className={cn("label-xs mb-4", light ? "text-brand-orange" : "text-brand-deep")}>
          {label}
        </p>
      ) : null}
      <h2
        className={cn(
          "text-[clamp(2rem,5.2vw,3.75rem)] leading-[1.02] tracking-[-0.02em]",
          light ? "text-brand-cream" : "text-brand-brown",
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed",
            light ? "text-brand-cream/75" : "text-brand-brown/70",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  );
}