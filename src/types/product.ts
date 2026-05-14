export type ProductStatus = "active" | "draft" | "archived";
export type StockStatus = "in_stock" | "low_stock" | "out_of_stock";

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string | null;
  parent?: Category | null;
  children?: Category[];
  productCount?: number;
}

export interface ProductVariant {
  id: string;
  productId: string;
  sku: string;
  price: number;
  compareAtPrice?: number | null;
  stock: number;
  attributes: Record<string, string>;
  images?: string[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  images: string[];
  categoryId: string;
  category?: Category;
  brandId?: string;
  brand?: Brand;
  tags: string[];
  status: ProductStatus;
  featured: boolean;
  variants: ProductVariant[];
  price: number;
  compareAtPrice?: number;
  stock: number;
  stockStatus: StockStatus;
  rating: number;
  reviewCount: number;
  attributes: Record<string, string[]>;
  createdAt: string;
  updatedAt: string;
  seo?: { title?: string; description?: string; keywords?: string[] };
}

export interface ProductListParams {
  page?: number;
  limit?: number;
  category?: string;
  brand?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: ProductSortOption;
  tags?: string[];
  inStock?: boolean;
  featured?: boolean;
}

export type ProductSortOption = "newest" | "oldest" | "price_asc" | "price_desc" | "rating" | "popular";
