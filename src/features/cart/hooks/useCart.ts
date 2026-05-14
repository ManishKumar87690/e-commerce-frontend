import { useCartStore } from "@/store/cart.store";
import { useToast } from "@/hooks/use-toast";
import type { Product, ProductVariant } from "@/types/product";

interface AddToCartOptions { product: Product; variant: ProductVariant; quantity?: number; }

export function useCart() {
  const store = useCartStore();
  const { toast } = useToast();
  const addToCart = ({ product, variant, quantity = 1 }: AddToCartOptions) => {
    if (variant.stock === 0) { toast({ title: "Out of stock", description: "This variant is currently unavailable.", variant: "destructive" }); return false; }
    store.addItem({ productId: product.id, variantId: variant.id, product: { id: product.id, name: product.name, slug: product.slug, images: product.images }, variant: { id: variant.id, sku: variant.sku, price: variant.price, compareAtPrice: variant.compareAtPrice, attributes: variant.attributes, stock: variant.stock }, quantity });
    toast({ title: "Added to cart", description: `${product.name} × ${quantity}`, duration: 2500 });
    return true;
  };
  return { ...store, cart: store.getCart(), itemCount: store.getItemCount(), addToCart };
}
