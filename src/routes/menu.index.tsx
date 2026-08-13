import { createFileRoute } from "@tanstack/react-router";
import { MenuBrowser } from "@/components/MenuBrowser";

export const Route = createFileRoute("/menu/")({
  validateSearch: (search: Record<string, unknown>): { q?: string } =>
    typeof search["q"] === "string" && search["q"] ? { q: search["q"] as string } : {},
  head: () => ({
    meta: [
      { title: "Mithai Menu & Rate List | Sabir Sweets & Bakers Lahore" },
      {
        name: "description",
        content:
          "Sabir Sweets & Bakers rate list: mithai, gulab jamun, barfi, laddu and khasta sweets in 0.5 kg, 1 kg and 2 kg.",
      },
      { property: "og:title", content: "Menu | Sabir Sweets & Bakers" },
      {
        property: "og:description",
        content: "Mithai, barfi, laddu and khasta — priced by the kilo in Lahore.",
      },
      { property: "og:url", content: "/menu" },
    ],
    links: [{ rel: "canonical", href: "/menu" }],
  }),
  component: MenuPage,
});

function MenuPage() {
  const { q } = Route.useSearch();
  return <MenuBrowser initialQuery={q ?? ""} />;
}
