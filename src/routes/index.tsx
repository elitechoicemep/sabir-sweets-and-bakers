import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/Hero";
import { Signatures } from "@/components/home/Signatures";
import { BestSellers } from "@/components/home/BestSellers";
import { MithaiExperience } from "@/components/home/MithaiExperience";
import { FreshFromOven } from "@/components/home/FreshFromOven";
import { Nashta } from "@/components/home/Nashta";
import { CustomCakes } from "@/components/home/CustomCakes";
import { BrandStory } from "@/components/home/BrandStory";
import { Reviews } from "@/components/home/Reviews";
import { LocationSection } from "@/components/home/LocationSection";

const TITLE = "Sabir Sweets & Bakers | Traditional Sweets & Fresh Bakery in Lahore";
const DESCRIPTION =
  "Discover traditional Pakistani mithai, fresh bakery favourites, cakes and more from Sabir Sweets & Bakers in Lahore.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <Signatures />
      <BestSellers />
      <MithaiExperience />
      <FreshFromOven />
      <Nashta />
      <CustomCakes />
      <BrandStory />
      <Reviews />
      <LocationSection />
    </>
  );
}
