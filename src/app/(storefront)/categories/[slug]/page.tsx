import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { MOCK_CATEGORIES, getMockProducts } from "@/lib/mock/products";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductCardSkeleton } from "@/components/product/ProductCardSkeleton";
import { ProductSort } from "@/features/products/components/ProductSort";
import { EmptyState } from "@/components/common/EmptyState";
import { Separator } from "@/components/ui/separator";
import { PackageSearch } from "lucide-react";
import { APP_CONFIG } from "@/constants/config";

interface CategoryPageProps { params: Promise<{ slug: string }>; }

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = MOCK_CATEGORIES.find((c) => c.slug === slug);
  if (!category) return { title: "Category not found" };
  return {
    title: category.name,
    description: category.description ?? `Shop all ${category.name} products.`,
    alternates: { canonical: `${APP_CONFIG.url}/categories/${slug}` },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = MOCK_CATEGORIES.find((c) => c.slug === slug);
  if (!category) notFound();
  const products = getMockProducts({ category: slug });
  return (
    <div className="container py-8 space-y-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold">{category.name}</h1>
        {category.description && <p className="text-muted-foreground">{category.description}</p>}
        <p className="text-sm text-muted-foreground">{products.length} products</p>
      </div>
      <div className="flex items-center justify-between">
        <Separator className="flex-1 mr-4" />
        <Suspense><ProductSort /></Suspense>
      </div>
      {products.length === 0 ? (
        <EmptyState icon={PackageSearch} title="No products in this category" description="Check back soon for new arrivals." />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product, i) => <ProductCard key={product.id} product={product} priority={i < 4} />)}
        </div>
      )}
    </div>
  );
}
