import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductFilters } from "@/features/products/components/ProductFilters";
import { ProductSort } from "@/features/products/components/ProductSort";
import { MobileFilters } from "@/features/products/components/MobileFilters";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductCardSkeleton } from "@/components/product/ProductCardSkeleton";
import { Separator } from "@/components/ui/separator";
import { getMockProducts } from "@/lib/mock/products";

export const metadata: Metadata = { title: "All Products", description: "Browse our complete collection of products." };

interface ProductsPageProps { searchParams: Promise<Record<string, string | string[] | undefined>>; }

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const category = typeof params.category === "string" ? params.category : undefined;
  const search = typeof params.search === "string" ? params.search : undefined;
  const featured = params.featured === "true" ? true : undefined;
  const products = getMockProducts({ category, search, featured, limit: 12 });

  return (
    <div className="container py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">All Products</h1>
        <p className="text-muted-foreground mt-1">Explore our complete collection</p>
      </div>
      <div className="flex gap-8">
        <aside className="hidden lg:block w-56 shrink-0">
          <Suspense><ProductFilters /></Suspense>
        </aside>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-4 gap-3">
            <div className="flex items-center gap-3">
              <Suspense><MobileFilters /></Suspense>
              <span className="text-sm text-muted-foreground">{products.length} products</span>
            </div>
            <Suspense><ProductSort /></Suspense>
          </div>
          <Separator className="mb-6" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product, i) => <ProductCard key={product.id} product={product} priority={i < 4} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
