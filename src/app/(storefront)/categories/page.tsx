import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { MOCK_CATEGORIES } from "@/lib/mock/products";
import { ROUTES } from "@/constants/routes";

export const metadata: Metadata = { title: "Categories", description: "Browse all product categories." };

export default function CategoriesPage() {
  return (
    <div className="container py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">All Categories</h1>
        <p className="text-muted-foreground mt-1">Find exactly what you&apos;re looking for</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {MOCK_CATEGORIES.map((category) => (
          <Link key={category.id} href={ROUTES.category(category.slug)} className="group flex flex-col rounded-xl border bg-card overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative aspect-video bg-muted overflow-hidden">
              {category.image && <Image src={category.image} alt={category.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover transition-transform duration-300 group-hover:scale-105" />}
            </div>
            <div className="p-4 flex-1">
              <h2 className="font-semibold group-hover:text-primary transition-colors">{category.name}</h2>
              {category.description && <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{category.description}</p>}
              <p className="text-xs text-muted-foreground mt-2">{category.productCount} products</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
