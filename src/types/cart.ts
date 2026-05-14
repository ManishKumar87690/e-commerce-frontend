import type { ProductVariant, Product } from "./product";

export interface CartItem {
  id: string;
  productId: string;
  variantId: string;
  product: Pick<Product, "id" | "name" | "slug" | "images">;
  variant: Pick<ProductVariant, "id" | "sku" | "price" | "compareAtPrice" | "attributes" | "stock">;
  quantity: number;
}

export interface Cart {
  id: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  discountCode?: string;
  total: number;
  itemCount: number;
}
