import type { Metadata } from "next";
import { APP_CONFIG } from "@/constants/config";

interface GenerateMetadataOptions {
  title: string;
  description?: string;
  image?: string;
  canonical?: string;
  noIndex?: boolean;
}

export function generateMetadata({ title, description = APP_CONFIG.description, image, canonical, noIndex = false }: GenerateMetadataOptions): Metadata {
  const fullTitle = `${title} | ${APP_CONFIG.name}`;
  const ogImage = image ?? `${APP_CONFIG.url}/og-image.png`;
  return {
    title: fullTitle,
    description,
    alternates: canonical ? { canonical } : undefined,
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: { title: fullTitle, description, images: [{ url: ogImage, width: 1200, height: 630, alt: title }], type: "website", siteName: APP_CONFIG.name },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [ogImage] },
  };
}
