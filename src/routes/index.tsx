import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/Hero";
import { GoogleReviews } from "@/components/home/GoogleReviews";
import {
  BestSellers,
  CulturalStrip,
  Location,
  Signatures,
  Story,
} from "@/components/home/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sabir Sweets & Bakers | Traditional Sweets & Bakery in Lahore" },
      {
        name: "description",
        content:
          "Discover traditional Pakistani mithai, fresh bakery favourites, cakes and more from Sabir Sweets & Bakers in Lahore.",
      },
      { property: "og:title", content: "Sabir Sweets & Bakers | Traditional Sweets & Bakery in Lahore" },
      {
        property: "og:description",
        content: "Traditional mithai, fresh bakery, desi nashta and celebration cakes in Lahore.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="-mt-[4.75rem] sm:-mt-[5rem]">
      <Hero />
      <Signatures />
      <BestSellers />
      <Story />
      <CulturalStrip />
      <GoogleReviews />
      <Location />
    </div>
  );
}
