"use client";
import { useState, useMemo } from "react";
import { ShoppingCart, Heart, Truck, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VariantSelector } from "@/components/product/VariantSelector";
import { QuantitySelector } from "@/components/product/QuantitySelector";
import { useCartStore } from "@/store/cart.store";
import { useWishlistStore } from "@/store/wishlist.store";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@/types/product";
import { cn } from "@/lib/cn";

interface AddToCartSectionProps { product: Product; }

export function AddToCartSection({ product }: AddToCartSectionProps) {
  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();
  const { toggle, isInWishlist } = useWishlistStore();
  const { toast } = useToast();
  const isWishlisted = isInWishlist(product.id);

  const selectedVariant = useMemo(() => {
    if (Object.keys(selectedAttributes).length === 0) return product.variants[0];
    return product.variants.find((v) => Object.entries(selectedAttributes).every(([k, val]) => v.attributes[k] === val));
  }, [selectedAttributes, product.variants]);

  const outOfStock = selectedVariant ? selectedVariant.stock === 0 : product.stockStatus === "out_of_stock";

  const handleAddToCart = () => {
    if (!selectedVariant) { toast({ description: "Please select all options.", variant: "destructive" }); return; }
    if (selectedVariant.stock === 0) { toast({ description: "This variant is out of stock.", variant: "destructive" }); return; }
    addItem({ productId: product.id, variantId: selectedVariant.id, product: { id: product.id, name: product.name, slug: product.slug, images: product.images }, variant: { id: selectedVariant.id, sku: selectedVariant.sku, price: selectedVariant.price, compareAtPrice: selectedVariant.compareAtPrice, attributes: selectedVariant.attributes, stock: selectedVariant.stock }, quantity });
    toast({ title: "Added to cart!", description: `${product.name} × ${quantity}` });
  };

  return (
    <div className="flex flex-col gap-4">
      {Object.keys(product.attributes).length > 0 && (
        <VariantSelector attributes={product.attributes} variants={product.variants} selectedAttributes={selectedAttributes} onAttributeChange={(key, value) => { setSelectedAttributes((prev) => ({ ...prev, [key]: value })); setQuantity(1); }} />
      )}
      <div className="flex items-center gap-2">
        <span className={cn("inline-flex items-center gap-1.5 text-sm font-medium", outOfStock ? "text-destructive" : product.stockStatus === "low_stock" ? "text-orange-500" : "text-green-600")}>
          <span className={cn("h-2 w-2 rounded-full", outOfStock ? "bg-destructive" : product.stockStatus === "low_stock" ? "bg-orange-400" : "bg-green-500")} />
          {outOfStock ? "Out of stock" : product.stockStatus === "low_stock" ? `Only ${selectedVariant?.stock ?? product.stock} left` : "In stock"}
        </span>
      </div>
      <div className="flex gap-3">
        <QuantitySelector value={quantity} onChange={setQuantity} max={selectedVariant?.stock ?? product.stock} disabled={outOfStock} />
        <Button className="flex-1 gap-2" size="lg" onClick={handleAddToCart} disabled={outOfStock}>
          <ShoppingCart className="h-5 w-5" />{outOfStock ? "Out of stock" : "Add to cart"}
        </Button>
        <Button variant="outline" size="lg" onClick={() => { toggle(product.id); toast({ description: isWishlisted ? "Removed from wishlist" : "Added to wishlist", duration: 2000 }); }}>
          <Heart className={cn("h-5 w-5", isWishlisted && "fill-rose-500 text-rose-500")} />
        </Button>
      </div>
      <div className="rounded-lg border p-4 space-y-2 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground"><Truck className="h-4 w-4" /><span>Free shipping on orders over $75</span></div>
        <div className="flex items-center gap-2 text-muted-foreground"><RotateCcw className="h-4 w-4" /><span>Free 30-day returns</span></div>
      </div>
    </div>
  );
}
