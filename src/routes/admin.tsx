import { createFileRoute } from "@tanstack/react-router";
import { useLanguage } from "@/lib/i18n";
import { SectionHeading } from "@/components/Ornament";
import { orderStatuses } from "@/services/orders";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin | Sabir Sweets & Bakers" },
      { name: "description", content: "Internal dashboard scaffolding for Sabir Sweets & Bakers." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Admin | Sabir Sweets & Bakers" },
      { property: "og:description", content: "Internal dashboard scaffolding." },
      { property: "og:url", content: "/admin" },
    ],
    links: [{ rel: "canonical", href: "/admin" }],
  }),
  component: AdminPage,
});

function AdminPage() {
  const { t, tList } = useLanguage();

  return (
    <div className="bg-background pb-24">
      <section className="jaali border-b border-border bg-secondary/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="Internal" title={t("admin.title")} subtitle={t("admin.lead")} />
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {tList("admin.sections").map((section) => (
            <li key={section} className="rounded-sm border border-border bg-card p-5">
              <p className="font-display text-lg">{section}</p>
              <p className="eyebrow mt-2 text-muted-foreground">{t("admin.soon")}</p>
            </li>
          ))}
        </ul>

        <h2 className="mt-14 text-2xl">{t("admin.statusTitle")}</h2>
        <ul className="mt-5 flex flex-wrap gap-2">
          {orderStatuses.map((status) => (
            <li
              key={status}
              className="rounded-sm border border-burnt/30 px-3 py-2 font-nav text-xs tracking-wider text-burnt"
            >
              {t(`admin.statuses.${status}`)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
