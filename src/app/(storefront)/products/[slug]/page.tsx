import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getMockProductBySlug, getMockProducts } from "@/lib/mock/products";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductGallery } from "@/components/product/ProductGallery";
import { VariantSelector } from "@/components/product/VariantSelector";
import { QuantitySelector } from "@/components/product/QuantitySelector";
import { RatingStars } from "@/components/common/RatingStars";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { APP_CONFIG } from "@/constants/config";
import { ROUTES } from "@/constants/routes";
import { formatPrice, getDiscountPercent } from "@/lib/format";
import { AddToCartSection } from "@/features/cart/components/AddToCartSection";

interface ProductPageProps { params: Promise<{ slug: string }>; }

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getMockProductBySlug(slug);
  if (!product) return { title: "Product not found" };
  const title = product.seo?.title ?? product.name;
  const description = product.seo?.description ?? product.description.slice(0, 160);
  return {
    title, description,
    openGraph: { title, description, images: product.images[0] ? [{ url: product.images[0], width: 800, height: 800, alt: product.name }] : [] },
    alternates: { canonical: `${APP_CONFIG.url}/products/${slug}` },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getMockProductBySlug(slug);
  if (!product) notFound();
  const related = getMockProducts({ category: product.category?.slug, limit: 4 }).filter((p) => p.id !== product.id);
  const jsonLd = {
    "@context": "https://schema.org", "@type": "Product",
    name: product.name, description: product.description, image: product.images,
    brand: product.brand ? { "@type": "Brand", name: product.brand.name } : undefined,
    offers: { "@type": "Offer", price: product.price, priceCurrency: APP_CONFIG.currency, availability: product.stockStatus === "out_of_stock" ? "https://schema.org/OutOfStock" : "https://schema.org/InStock" },
    aggregateRating: product.reviewCount > 0 ? { "@type": "AggregateRating", ratingValue: product.rating, reviewCount: product.reviewCount } : undefined,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container py-8">
        <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground">Home</Link><span>/</span>
          <Link href={ROUTES.products} className="hover:text-foreground">Products</Link>
          {product.category && <><span>/</span><Link href={ROUTES.category(product.category.slug)} className="hover:text-foreground">{product.category.name}</Link></>}
          <span>/</span><span className="text-foreground truncate max-w-[200px]">{product.name}</span>
        </nav>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <ProductGallery images={product.images} productName={product.name} />
          <div className="flex flex-col gap-4">
            {product.brand && <Link href={`${ROUTES.products}?brand=${product.brand.slug}`} className="text-sm text-muted-foreground uppercase tracking-wide hover:text-primary">{product.brand.name}</Link>}
            <h1 className="text-3xl font-bold leading-tight">{product.name}</h1>
            <div className="flex items-center gap-3">
              <RatingStars rating={product.rating} count={product.reviewCount} size="md" />
              <span className="text-sm text-muted-foreground">{product.reviewCount} reviews</span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <><span className="text-lg text-muted-foreground line-through">{formatPrice(product.compareAtPrice)}</span><Badge variant="destructive">-{getDiscountPercent(product.price, product.compareAtPrice)}%</Badge></>
              )}
            </div>
            {product.shortDescription && <p className="text-muted-foreground">{product.shortDescription}</p>}
            <Separator />
            <AddToCartSection product={product} />
            {product.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {product.tags.map((tag) => <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>)}
              </div>
            )}
          </div>
        </div>
        <Separator className="my-10" />
        <div className="max-w-2xl">
          <h2 className="text-xl font-semibold mb-4">Product Description</h2>
          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{product.description}</p>
        </div>
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
