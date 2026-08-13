import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Quote, Star } from "lucide-react";
import { SectionHeading } from "@/components/Ornament";
import { Reveal } from "@/components/Reveal";
import { useLanguage } from "@/lib/i18n";
import {
  GOOGLE_REVIEWS_URL,
  GOOGLE_REVIEW_URL,
  getGoogleReviews,
} from "@/lib/reviews.functions";
import { cn } from "@/lib/utils";

function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <div className={cn("flex items-center gap-0.5", className)} aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={cn("size-4", i <= Math.round(rating) ? "fill-primary text-primary" : "text-border")}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export function GoogleReviews() {
  const { t } = useLanguage();
  const fetchReviews = useServerFn(getGoogleReviews);
  const { data, isPending, isError } = useQuery({
    queryKey: ["google-reviews"],
    queryFn: () => fetchReviews(),
    staleTime: 1000 * 60 * 30,
  });

  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Google Reviews"
          title={t("reviews.title")}
          subtitle={t("reviews.subtitle")}
        />

        {data && (data.rating !== null || data.total !== null) && (
          <div className="mt-8 flex flex-col items-center gap-2">
            <div className="flex items-center gap-3">
              <span className="font-display text-3xl text-foreground">{data.rating?.toFixed(1)}</span>
              {data.rating !== null && <Stars rating={data.rating} />}
            </div>
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-nav text-xs tracking-wider text-muted-foreground uppercase underline-offset-4 hover:text-primary hover:underline"
            >
              {data.total} {t("reviews.count")}
            </a>
          </div>
        )}

        {isPending && (
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-48 animate-pulse rounded-sm border border-border bg-card" />
            ))}
          </div>
        )}

        {isError && (
          <p className="mt-12 text-center text-sm text-muted-foreground">
            {t("reviews.error")}{" "}
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-4"
            >
              Google
            </a>
          </p>
        )}

        {data && data.reviews.length > 0 && (
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {data.reviews.slice(0, 6).map((review, i) => (
              <Reveal key={review.name} delay={i * 0.08}>
                <figure className="flex h-full flex-col rounded-sm border border-border bg-card p-6">
                  <Quote className="size-7 text-primary rtl:rotate-180" aria-hidden="true" />
                  <Stars rating={review.rating} className="mt-4" />
                  <blockquote className="mt-4 flex-1 text-sm text-foreground sm:text-base">
                    {review.text}
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                    {review.photo && (
                      <img
                        src={review.photo}
                        alt=""
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="size-8 rounded-full object-cover"
                      />
                    )}
                    <span className="font-nav text-xs tracking-wider text-muted-foreground uppercase">
                      {review.author}
                      {review.relative && ` • ${review.relative}`}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        )}

        <div className="mt-10 flex justify-center">
          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="eyebrow inline-flex min-h-12 items-center gap-3 rounded-sm bg-primary px-6 text-primary-foreground transition-colors hover:bg-ink hover:text-beige"
          >
            {t("reviews.write")}
            <span className="font-urdu text-base leading-none">{t("reviews.writeUr")}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
