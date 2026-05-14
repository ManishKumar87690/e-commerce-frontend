import { APP_CONFIG } from "@/constants/config";
import type { Product } from "@/types/product";

export function getProductJsonLd(product: Product): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images,
    brand: product.brand ? { "@type": "Brand", name: product.brand.name } : undefined,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: APP_CONFIG.currency,
      lowPrice: product.price,
      availability: product.stockStatus === "out_of_stock" ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
      seller: { "@type": "Organization", name: APP_CONFIG.name, url: APP_CONFIG.url },
    },
    aggregateRating: product.reviewCount > 0 ? { "@type": "AggregateRating", ratingValue: product.rating.toFixed(1), reviewCount: product.reviewCount } : undefined,
  };
}

export function getWebsiteJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: APP_CONFIG.name,
    url: APP_CONFIG.url,
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${APP_CONFIG.url}/search?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };
}

export function getOrganizationJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: APP_CONFIG.name,
    url: APP_CONFIG.url,
    contactPoint: { "@type": "ContactPoint", email: APP_CONFIG.supportEmail, contactType: "customer support" },
  };
}
