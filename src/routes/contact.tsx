import { createFileRoute } from "@tanstack/react-router";
import { useLanguage } from "@/lib/i18n";
import { SectionHeading } from "@/components/Ornament";
import { Location } from "@/components/home/Sections";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Location | Sabir Sweets & Bakers Lahore" },
      {
        name: "description",
        content:
          "Visit Sabir Sweets & Bakers at Outfall Road, Saint Nagar, Lahore, or send us a message about custom cake and bulk orders.",
      },
      { property: "og:title", content: "Contact | Sabir Sweets & Bakers" },
      { property: "og:description", content: "Find us in Lahore or message us about your order." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t } = useLanguage();
  return (
    <div className="bg-background">
      <section className="jaali border-b border-border bg-secondary/40 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="Contact" title={t("contact.title")} subtitle={t("contact.lead")} />
        </div>
      </section>

      <Location />
    </div>
  );
}
