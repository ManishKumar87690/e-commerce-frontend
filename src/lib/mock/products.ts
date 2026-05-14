import type { Product, Category, Brand } from "@/types/product";

export const MOCK_BRANDS: Brand[] = [
  { id: "brand-1", name: "Nike", slug: "nike" },
  { id: "brand-2", name: "Adidas", slug: "adidas" },
  { id: "brand-3", name: "Apple", slug: "apple" },
  { id: "brand-4", name: "Sony", slug: "sony" },
];

export const MOCK_CATEGORIES: Category[] = [
  { id: "cat-1", name: "Electronics", slug: "electronics", description: "Gadgets and tech", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400", productCount: 24 },
  { id: "cat-2", name: "Clothing", slug: "clothing", description: "Apparel and fashion", image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400", productCount: 38 },
  { id: "cat-3", name: "Shoes", slug: "shoes", description: "Footwear for all occasions", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400", productCount: 15 },
  { id: "cat-4", name: "Home & Living", slug: "home-living", description: "Furniture and decor", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400", productCount: 20 },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "prod-1", name: "Air Max 270", slug: "air-max-270",
    description: "The Nike Air Max 270 delivers an iconic look with unparalleled cushioning. Inspired by two of Nike's greatest athletes, it features the tallest Air unit yet, providing maximum comfort for all-day wear.",
    shortDescription: "Max cushioning, maximum style.",
    images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800", "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800"],
    categoryId: "cat-3", category: MOCK_CATEGORIES[2], brandId: "brand-1", brand: MOCK_BRANDS[0],
    tags: ["running", "air-max", "trending"], status: "active", featured: true,
    price: 150, compareAtPrice: 180, stock: 24, stockStatus: "in_stock", rating: 4.7, reviewCount: 128,
    attributes: { color: ["black", "white", "red"], size: ["7", "8", "9", "10", "11"] },
    variants: [
      { id: "v1", productId: "prod-1", sku: "AM270-BLK-9", price: 150, compareAtPrice: 180, stock: 4, attributes: { color: "black", size: "9" } },
      { id: "v2", productId: "prod-1", sku: "AM270-WHT-9", price: 150, compareAtPrice: 180, stock: 6, attributes: { color: "white", size: "9" } },
      { id: "v3", productId: "prod-1", sku: "AM270-RED-10", price: 155, compareAtPrice: 185, stock: 0, attributes: { color: "red", size: "10" } },
    ],
    createdAt: "2024-01-15T10:00:00Z", updatedAt: "2024-06-01T10:00:00Z",
    seo: { title: "Nike Air Max 270 | Best Running Shoes", description: "Buy Nike Air Max 270 with max cushioning." },
  },
  {
    id: "prod-2", name: "iPhone 15 Pro", slug: "iphone-15-pro",
    description: "iPhone 15 Pro. Forged in titanium and featuring the groundbreaking A17 Pro chip, a customizable Action button, and the most powerful iPhone camera system ever.",
    shortDescription: "Titanium. So strong. So light. So Pro.",
    images: ["https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800", "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800"],
    categoryId: "cat-1", category: MOCK_CATEGORIES[0], brandId: "brand-3", brand: MOCK_BRANDS[2],
    tags: ["smartphone", "apple", "flagship"], status: "active", featured: true,
    price: 999, stock: 12, stockStatus: "in_stock", rating: 4.9, reviewCount: 342,
    attributes: { color: ["natural titanium", "blue titanium", "black titanium"], storage: ["128GB", "256GB", "512GB"] },
    variants: [
      { id: "v4", productId: "prod-2", sku: "IP15P-NAT-128", price: 999, stock: 5, attributes: { color: "natural titanium", storage: "128GB" } },
      { id: "v5", productId: "prod-2", sku: "IP15P-BLU-256", price: 1099, stock: 3, attributes: { color: "blue titanium", storage: "256GB" } },
      { id: "v6", productId: "prod-2", sku: "IP15P-BLK-512", price: 1299, stock: 4, attributes: { color: "black titanium", storage: "512GB" } },
    ],
    createdAt: "2024-02-01T10:00:00Z", updatedAt: "2024-06-01T10:00:00Z",
  },
  {
    id: "prod-3", name: "Sony WH-1000XM5", slug: "sony-wh-1000xm5",
    description: "Industry-leading noise canceling with the new Integrated Processor V1. Crystal clear hands-free calling. Up to 30-hour battery life with quick charging.",
    shortDescription: "Best-in-class noise canceling headphones.",
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800"],
    categoryId: "cat-1", category: MOCK_CATEGORIES[0], brandId: "brand-4", brand: MOCK_BRANDS[3],
    tags: ["headphones", "noise-canceling", "wireless"], status: "active", featured: false,
    price: 349, compareAtPrice: 399, stock: 8, stockStatus: "low_stock", rating: 4.8, reviewCount: 89,
    attributes: { color: ["black", "silver"] },
    variants: [
      { id: "v7", productId: "prod-3", sku: "WH1000XM5-BLK", price: 349, compareAtPrice: 399, stock: 5, attributes: { color: "black" } },
      { id: "v8", productId: "prod-3", sku: "WH1000XM5-SLV", price: 349, compareAtPrice: 399, stock: 3, attributes: { color: "silver" } },
    ],
    createdAt: "2024-03-01T10:00:00Z", updatedAt: "2024-06-01T10:00:00Z",
  },
  {
    id: "prod-4", name: "Classic Oxford Shirt", slug: "classic-oxford-shirt",
    description: "A timeless Oxford shirt crafted from premium 100% cotton. Features a button-down collar, chest pocket, and a slightly relaxed fit perfect for both casual and semi-formal occasions.",
    shortDescription: "Timeless Oxford shirt in premium cotton.",
    images: ["https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800"],
    categoryId: "cat-2", category: MOCK_CATEGORIES[1],
    tags: ["shirt", "casual", "cotton"], status: "active", featured: false,
    price: 65, stock: 50, stockStatus: "in_stock", rating: 4.3, reviewCount: 47,
    attributes: { color: ["white", "blue", "pink"], size: ["XS", "S", "M", "L", "XL"] },
    variants: [
      { id: "v9", productId: "prod-4", sku: "OXF-WHT-M", price: 65, stock: 10, attributes: { color: "white", size: "M" } },
      { id: "v10", productId: "prod-4", sku: "OXF-BLU-M", price: 65, stock: 12, attributes: { color: "blue", size: "M" } },
      { id: "v11", productId: "prod-4", sku: "OXF-BLU-L", price: 65, stock: 8, attributes: { color: "blue", size: "L" } },
    ],
    createdAt: "2024-04-01T10:00:00Z", updatedAt: "2024-06-01T10:00:00Z",
  },
];

export function getMockProducts(params?: { category?: string; featured?: boolean; limit?: number; search?: string }): Product[] {
  let results = [...MOCK_PRODUCTS];
  if (params?.category) results = results.filter((p) => p.category?.slug === params.category);
  if (params?.featured !== undefined) results = results.filter((p) => p.featured === params.featured);
  if (params?.search) {
    const q = params.search.toLowerCase();
    results = results.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.tags.some((t) => t.includes(q)));
  }
  if (params?.limit) results = results.slice(0, params.limit);
  return results;
}

export function getMockProductBySlug(slug: string): Product | undefined {
  return MOCK_PRODUCTS.find((p) => p.slug === slug);
}
