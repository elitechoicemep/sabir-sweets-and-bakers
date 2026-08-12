import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { BrandStory } from "@/components/home/BrandStory";
import { LocationSection } from "@/components/home/LocationSection";

const TITLE = "About | Sabir Sweets & Bakers, Lahore";
const DESCRIPTION =
  "Traditional sweets and fresh bakery prepared daily in Lahore by Sabir Sweets & Bakers.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHeader
        label="About"
        title="Tradition in every bite"
        intro="Freshly made. Traditionally loved. Sweets, bakery and nashta prepared each day on Outfall Road, Lahore."
      />
      <BrandStory />
      <LocationSection />
    </>
  );
}