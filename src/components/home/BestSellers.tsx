import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ProductCard } from "@/components/product/ProductCard";
import { products } from "@/data/products";

export function BestSellers() {
  const bestSellers = products.filter((p) => p.bestSeller);

  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <SectionHeading
          label="Best Sellers"
          title="Loved by Lahore"
          subtitle="Our most-loved favourites, freshly prepared."
        />
        <div className="mt-16 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {bestSellers.map((product, i) => (
            <Reveal key={product.id} delay={(i % 4) * 0.05}>
              <ProductCard product={product} className="h-full" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}