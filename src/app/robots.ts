import type { MetadataRoute } from "next";
import { APP_CONFIG } from "@/constants/config";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/account", "/checkout", "/api/"] }],
    sitemap: `${APP_CONFIG.url}/sitemap.xml`,
  };
}
