import type { MetadataRoute } from "next";
import { APP_CONFIG } from "@/constants/config";
import { getMockProducts, MOCK_CATEGORIES } from "@/lib/mock/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const products = getMockProducts({ limit: 100 });
  const base = APP_CONFIG.url;
  return [
    { url: base, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${base}/products`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/categories`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    ...products.map((p) => ({ url: `${base}/products/${p.slug}`, lastModified: new Date(p.updatedAt), changeFrequency: "weekly" as const, priority: 0.7 })),
    ...MOCK_CATEGORIES.map((c) => ({ url: `${base}/categories/${c.slug}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.6 })),
  ];
}
