import type { Category } from "@/types";
import mithai from "@/assets/cat-mithai.jpg";
import cakes from "@/assets/cat-cakes.jpg";
import bakery from "@/assets/cat-bakery.jpg";
import namkeen from "@/assets/cat-namkeen.jpg";
import desserts from "@/assets/cat-desserts.jpg";
import nashta from "@/assets/cat-nashta.jpg";

export const categories: Category[] = [
  { slug: "mithai", name: "Mithai", tagline: "Traditional sweets", image: mithai },
  { slug: "cakes", name: "Cakes", tagline: "For every celebration", image: cakes },
  { slug: "bakery", name: "Fresh Bakery", tagline: "Baked through the day", image: bakery },
  { slug: "biscuits", name: "Biscuits", tagline: "Tea-time classics", image: bakery },
  { slug: "desserts", name: "Desserts", tagline: "Warm and comforting", image: desserts },
  { slug: "namkeen", name: "Namkeen", tagline: "Savoury favourites", image: namkeen },
  { slug: "nashta", name: "Nashta", tagline: "The Lahore morning", image: nashta },
  { slug: "beverages", name: "Beverages", tagline: "Chai and more", image: nashta },
];

export const categoryImages = { mithai, cakes, bakery, namkeen, desserts, nashta };

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}