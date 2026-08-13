import { createFileRoute } from "@tanstack/react-router";
import { Story } from "@/components/home/Sections";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Sabir Sweets & Bakers | Lahore Sweet Shop & Bakery" },
      {
        name: "description",
        content:
          "Sabir Sweets & Bakers is a Lahore sweet shop and bakery on Outfall Road, Saint Nagar — freshly prepared mithai, bakery items and desi nashta.",
      },
      { property: "og:title", content: "About | Sabir Sweets & Bakers" },
      { property: "og:description", content: "A Lahore sweet shop and bakery built on fresh preparation." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="bg-background">
      <Story />
    </div>
  );
}
