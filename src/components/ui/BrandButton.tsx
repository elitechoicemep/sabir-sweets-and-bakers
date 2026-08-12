import { Link } from "@tanstack/react-router";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outlineCream" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "label-xs inline-flex items-center justify-center gap-2 min-h-11 transition-all duration-500 [transition-timing-function:var(--ease-cinematic)] disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-orange text-brand-ink hover:bg-brand-deep hover:text-brand-cream hover:-translate-y-0.5",
  secondary:
    "border border-brand-orange text-brand-orange bg-transparent hover:bg-brand-orange hover:text-brand-ink hover:-translate-y-0.5",
  outlineCream:
    "border border-brand-cream text-brand-cream bg-transparent hover:bg-brand-cream hover:text-brand-brown hover:-translate-y-0.5",
  ghost: "text-brand-brown hover:text-brand-deep",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-[0.625rem]",
  md: "px-6 py-3.5",
  lg: "px-9 py-4.5",
};

export function buttonClass(variant: Variant = "primary", size: Size = "md", extra?: string) {
  return cn(base, variants[variant], sizes[size], extra);
}

interface Props extends Omit<ComponentProps<"button">, "children"> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

export function Button({ variant = "primary", size = "md", className, children, ...rest }: Props) {
  return (
    <button className={buttonClass(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}

type LinkProps = ComponentProps<typeof Link> & { variant?: Variant; size?: Size };

export function ButtonLink({ variant = "primary", size = "md", className, ...rest }: LinkProps) {
  return <Link className={buttonClass(variant, size, className as string)} {...rest} />;
}

export function ButtonAnchor({
  variant = "primary",
  size = "md",
  className,
  ...rest
}: ComponentProps<"a"> & { variant?: Variant; size?: Size }) {
  return <a className={buttonClass(variant, size, className)} {...rest} />;
}