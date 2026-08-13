import { categories, products } from "@/data/catalog";
import { apiGet } from "./api";
import type { Category, CategoryId, Product } from "@/types";

export function listCategories(): Promise<Category[]> {
  return apiGet<Category[]>("/categories", () => categories);
}

export function listProducts(): Promise<Product[]> {
  return apiGet<Product[]>("/products", () => products);
}

export function listFeatured(): Promise<Product[]> {
  return apiGet<Product[]>("/products?featured=1", () => products.filter((p) => p.featured));
}

export function getProduct(id: string): Promise<Product | undefined> {
  return apiGet<Product | undefined>(`/products/${id}`, () => products.find((p) => p.id === id));
}

export function listByCategory(category: CategoryId): Promise<Product[]> {
  return apiGet<Product[]>(`/products?category=${category}`, () =>
    products.filter((p) => p.category === category),
  );
}

/** Matches English and Urdu names, descriptions and category labels. */
export function searchProducts(items: Product[], query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return items;
  return items.filter((p) =>
    [p.name, p.nameUr, p.description, p.descriptionUr, p.category].some((field) =>
      field.toLowerCase().includes(q),
    ),
  );
}

export const productQueries = {
  all: () => ({ queryKey: ["products"], queryFn: listProducts }),
  featured: () => ({ queryKey: ["products", "featured"], queryFn: listFeatured }),
  detail: (id: string) => ({ queryKey: ["products", id], queryFn: () => getProduct(id) }),
};
