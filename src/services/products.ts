import { products } from "@/data/products";
import { categories, getCategory } from "@/data/categories";
import type { Product } from "@/types";
import { local } from "./api";

export type SortKey = "featured" | "name-asc" | "name-desc";

export interface ProductQuery {
  category?: string;
  search?: string;
  sort?: SortKey;
}

export function listCategories() {
  return local(categories);
}

export function fetchCategory(slug: string) {
  return local(getCategory(slug) ?? null);
}

export function listProducts(query: ProductQuery = {}): Promise<Product[]> {
  let result = [...products];
  if (query.category && query.category !== "all") {
    result = result.filter((p) => p.category === query.category);
  }
  if (query.search?.trim()) {
    const q = query.search.trim().toLowerCase();
    result = result.filter(
      (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q),
    );
  }
  switch (query.sort) {
    case "name-asc":
      result.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "name-desc":
      result.sort((a, b) => b.name.localeCompare(a.name));
      break;
    default:
      result.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
  }
  return local(result);
}

export function listBestSellers() {
  return local(products.filter((p) => p.bestSeller));
}

export function fetchProduct(id: string) {
  return local(products.find((p) => p.id === id) ?? null);
}

export function listRelated(product: Product, limit = 4) {
  return local(
    products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, limit),
  );
}