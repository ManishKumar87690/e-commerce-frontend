import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductForm } from "@/features/admin/components/ProductForm";
import { getMockProducts } from "@/lib/mock/products";
import { ROUTES } from "@/constants/routes";

export const metadata: Metadata = { title: "Admin – Edit Product" };

interface EditProductPageProps { params: Promise<{ id: string }>; }

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const product = getMockProducts({ limit: 100 }).find((p) => p.id === id);
  if (!product) notFound();
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="h-8 w-8" asChild><Link href={ROUTES.adminProducts}><ChevronLeft className="h-4 w-4" /></Link></Button>
        <div><h1 className="text-2xl font-bold">Edit Product</h1><p className="text-muted-foreground text-sm">{product.name}</p></div>
      </div>
      <ProductForm productId={product.id} defaultValues={{ name: product.name, slug: product.slug, description: product.description, shortDescription: product.shortDescription, images: product.images, categoryId: product.categoryId, brandId: product.brandId, tags: product.tags, status: product.status, featured: product.featured, variants: product.variants.map((v) => ({ sku: v.sku, price: v.price, compareAtPrice: v.compareAtPrice ?? null, stock: v.stock, attributes: v.attributes })), seo: product.seo }} />
    </div>
  );
}
