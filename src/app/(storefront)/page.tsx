import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Shield, Truck, RotateCcw, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/ProductCard";
import { APP_CONFIG } from "@/constants/config";
import { ROUTES } from "@/constants/routes";
import { getMockProducts, MOCK_CATEGORIES } from "@/lib/mock/products";

export const metadata: Metadata = {
  title: `${APP_CONFIG.name} – Shop the Best`,
  description: APP_CONFIG.description,
};

const FEATURES = [
  { icon: Truck, title: "Free Shipping", description: `On orders over $${APP_CONFIG.freeShippingThreshold}` },
  { icon: RotateCcw, title: "Easy Returns", description: "30-day return policy" },
  { icon: Shield, title: "Secure Payment", description: "SSL encrypted checkout" },
  { icon: Headphones, title: "24/7 Support", description: "Always here to help" },
];

export default async function HomePage() {
  const featuredProducts = getMockProducts({ featured: true, limit: 4 });
  const newArrivals = getMockProducts({ limit: 8 });
  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="container py-24 md:py-32 relative z-10">
          <div className="max-w-2xl">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-4">New Season Collection</p>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">Discover Your<br /><span className="text-primary">Perfect Style</span></h1>
            <p className="text-slate-300 text-lg mb-8 max-w-lg">Shop the latest trends with exclusive deals and curated collections for every taste and budget.</p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild><Link href={ROUTES.products}>Shop Now <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild><Link href="/categories">Browse Categories</Link></Button>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary/5 rounded-full translate-y-1/2" />
      </section>
      {/* Features */}
      <section className="container">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex flex-col items-center text-center gap-2 p-4 rounded-lg border bg-card">
              <div className="p-2 rounded-full bg-primary/10"><Icon className="h-5 w-5 text-primary" /></div>
              <p className="font-semibold text-sm">{title}</p>
              <p className="text-xs text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </section>
      {/* Categories */}
      <section className="container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Shop by Category</h2>
          <Button variant="ghost" asChild className="gap-1"><Link href="/categories">View all <ArrowRight className="h-4 w-4" /></Link></Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {MOCK_CATEGORIES.map((category) => (
            <Link key={category.id} href={ROUTES.category(category.slug)} className="group relative aspect-square rounded-xl overflow-hidden bg-muted">
              {category.image && <Image src={category.image} alt={category.name} fill className="object-cover transition-transform duration-300 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 25vw" />}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <p className="font-semibold">{category.name}</p>
                <p className="text-xs text-white/70">{category.productCount} products</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      {/* Featured Products */}
      <section className="container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Button variant="ghost" asChild className="gap-1"><Link href={`${ROUTES.products}?featured=true`}>View all <ArrowRight className="h-4 w-4" /></Link></Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featuredProducts.map((product, i) => <ProductCard key={product.id} product={product} priority={i < 2} />)}
        </div>
      </section>
      {/* Promo Banner */}
      <section className="container">
        <div className="rounded-2xl bg-gradient-to-r from-primary/90 to-primary p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest mb-2 text-primary-foreground/80">Limited Time Offer</p>
            <h2 className="text-3xl font-bold mb-2">Up to 50% Off</h2>
            <p className="text-primary-foreground/80">On selected items. Use code <span className="font-mono font-bold bg-white/20 px-2 py-0.5 rounded">SAVE50</span></p>
          </div>
          <Button size="lg" variant="secondary" asChild><Link href={`${ROUTES.products}?sort=price_asc`}>Shop the Sale</Link></Button>
        </div>
      </section>
      {/* New Arrivals */}
      <section className="container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">New Arrivals</h2>
          <Button variant="ghost" asChild className="gap-1"><Link href={`${ROUTES.products}?sort=newest`}>View all <ArrowRight className="h-4 w-4" /></Link></Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {newArrivals.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>
    </div>
  );
}
