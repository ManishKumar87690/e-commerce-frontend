import type { Metadata } from "next";
import { getMockProducts } from "@/lib/mock/products";
import { ProductCard } from "@/components/product/ProductCard";
import { EmptyState } from "@/components/common/EmptyState";
import { SearchX } from "lucide-react";
import { ROUTES } from "@/constants/routes";

interface SearchPageProps { searchParams: Promise<{ q?: string }>; }

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  return { title: q ? `Search: "${q}"` : "Search Products", robots: { index: false, follow: true } };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const results = q ? getMockProducts({ search: q }) : [];
  return (
    <div className="container py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{q ? `Results for "${q}"` : "Search Products"}</h1>
        {q && results.length > 0 && <p className="text-sm text-muted-foreground mt-1">{results.length} result{results.length !== 1 ? "s" : ""} found</p>}
      </div>
      {!q ? (
        <EmptyState icon={SearchX} title="Enter a search term" description="Type a product name, category, or keyword to get started." />
      ) : results.length === 0 ? (
        <EmptyState icon={SearchX} title={`No results for "${q}"`} description="Try different keywords or browse all products." actionLabel="Browse all products" actionHref={ROUTES.products} />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map((product, i) => <ProductCard key={product.id} product={product} priority={i < 4} />)}
        </div>
      )}
    </div>
  );
}
