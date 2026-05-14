import { format, formatDistance, parseISO } from "date-fns";

export function formatPrice(amount: number, currency = "USD", locale = "en-US"): string {
  return new Intl.NumberFormat(locale, { style: "currency", currency, minimumFractionDigits: 2 }).format(amount);
}

export function formatDate(dateString: string, pattern = "MMM d, yyyy"): string {
  try { return format(parseISO(dateString), pattern); } catch { return dateString; }
}

export function formatRelativeDate(dateString: string): string {
  try { return formatDistance(parseISO(dateString), new Date(), { addSuffix: true }); } catch { return dateString; }
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}…`;
}

export function getDiscountPercent(price: number, compareAtPrice: number): number {
  if (!compareAtPrice || compareAtPrice <= price) return 0;
  return Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
}
