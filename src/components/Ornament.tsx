import { cn } from "@/lib/utils";

/** Ornamental divider removed by design request — kept as a no-op for compatibility. */
export function Ornament(_props: { className?: string; tone?: "dark" | "light" }) {
  return null;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  tone = "dark",
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  tone?: "dark" | "light";
  align?: "center" | "start";
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-start",
      )}
    >
      {eyebrow ? (
        <p className={cn("eyebrow", tone === "light" ? "text-primary" : "text-burnt")}>{eyebrow}</p>
      ) : null}
      <h2
        className={cn(
          "mt-3 text-3xl leading-tight sm:text-4xl md:text-[2.75rem]",
          tone === "light" ? "text-brown-foreground" : "text-foreground",
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "mt-4 text-sm sm:text-base",
            tone === "light" ? "text-brown-foreground/70" : "text-muted-foreground",
          )}
        >
          {subtitle}
        </p>
      ) : null}
      <Ornament className={cn("mt-6", align === "center" ? "mx-auto max-w-[10rem]" : "max-w-[8rem]")} tone={tone === "light" ? "light" : "dark"} />
    </div>
  );
}
