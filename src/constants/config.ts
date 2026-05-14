export const APP_CONFIG = {
  name: process.env.NEXT_PUBLIC_APP_NAME ?? "Storefront",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  description: "The best single-vendor e-commerce experience.",
  currency: "USD",
  locale: "en-US",
  itemsPerPage: 12,
  maxCartQuantity: 99,
  freeShippingThreshold: 75,
  shippingCost: 9.99,
  taxRate: 0.08,
  supportEmail: "support@storefront.com",
} as const;
