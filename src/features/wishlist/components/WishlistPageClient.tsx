"use client";
import { Heart, ShoppingCart } from "lucide-react";
import { useWishlistStore } from "@/store/wishlist.store";
import { useCartStore } from "@/store/cart.store";
import { MOCK_PRODUCTS } from "@/lib/mock/products";
import { ProductCard } from "@/components/product/ProductCard";
import { EmptyState } from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ROUTES } from "@/constants/routes";

export function WishlistPageClient() {
  const { productIds, removeItem } = useWishlistStore();
  const { addItem } = useCartStore();
  const { toast } = useToast();
  const wishlistedProducts = MOCK_PRODUCTS.filter((p) => productIds.has(p.id));

  if (wishlistedProducts.length === 0) {
    return (
      <EmptyState
        icon={Heart}
        title="Your wishlist is empty"
        description="Save products you love by clicking the heart icon on any product."
        actionLabel="Discover products"
        actionHref={ROUTES.products}
      />
    );
  }

  const handleMoveToCart = (productId: string) => {
    const product = MOCK_PRODUCTS.find((p) => p.id === productId);
    if (!product || product.variants.length === 0) return;
    const variant = product.variants[0];
    addItem({
      productId: product.id,
      variantId: variant.id,
      product: { id: product.id, name: product.name, slug: product.slug, images: product.images },
      variant: {
        id: variant.id,
        sku: variant.sku,
        price: variant.price,
        compareAtPrice: variant.compareAtPrice,
        attributes: variant.attributes,
        stock: variant.stock,
      },
      quantity: 1,
    });
    removeItem(productId);
    toast({ description: `${product.name} moved to cart` });
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        {wishlistedProducts.length} saved item{wishlistedProducts.length !== 1 ? "s" : ""}
      </p>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {wishlistedProducts.map((product) => (
          <div key={product.id} className="group relative">
            <ProductCard product={product} />
            <div className="mt-2 flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 gap-1.5 text-xs"
                onClick={() => handleMoveToCart(product.id)}
              >
                <ShoppingCart className="h-3.5 w-3.5" />
                Move to cart
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-muted-foreground"
                onClick={() => {
                  removeItem(product.id);
                  toast({ description: "Removed from wishlist" });
                }}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
