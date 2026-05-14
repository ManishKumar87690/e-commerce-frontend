import { ROUTES } from "./routes";
export const NAV_LINKS = [
  { label: "Products", href: ROUTES.products },
  { label: "Categories", href: "/categories" },
  { label: "Deals", href: `${ROUTES.products}?sort=price_asc` },
  { label: "New Arrivals", href: `${ROUTES.products}?sort=newest` },
] as const;
