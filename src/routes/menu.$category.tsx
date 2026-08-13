import { createFileRoute } from "@tanstack/react-router";
import { MenuBrowser } from "@/components/MenuBrowser";
import { categories } from "@/data/catalog";
import type { CategoryId } from "@/types";

export const Route = createFileRoute("/menu/$category")({
  head: ({ params }) => {
    const category = categories.find((c) => c.id === params.category);
    const label = category ? category.name : "Menu";
    return {
      meta: [
        { title: `${label} | Sabir Sweets & Bakers Lahore` },
        {
          name: "description",
          content: `Browse ${label.toLowerCase()} from Sabir Sweets & Bakers — freshly prepared daily in Lahore.`,
        },
        { property: "og:title", content: `${label} | Sabir Sweets & Bakers` },
        {
          property: "og:description",
          content: `Freshly prepared ${label.toLowerCase()} from our Lahore counters.`,
        },
        { property: "og:url", content: `/menu/${params.category}` },
      ],
      links: [{ rel: "canonical", href: `/menu/${params.category}` }],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useParams();
  const valid = categories.some((c) => c.id === category);
  return <MenuBrowser {...(valid ? { activeCategory: category as CategoryId } : {})} />;
}
