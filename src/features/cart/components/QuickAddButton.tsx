"use client";
import { ShoppingCart, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart.store";
import type { Product } from "@/types/product";
import { useToast } from "@/hooks/use-toast";
import { ROUTES } from "@/constants/routes";
import Link from "next/link";

interface QuickAddButtonProps { product: Product; }

export function QuickAddButton({ product }: QuickAddButtonProps) {
  const [added, setAdded] = useState(false);
  const { addItem } = useCartStore();
  const { toast } = useToast();
  if (product.variants.length > 1) {
    return <Button size="icon" variant="outline" className="h-8 w-8" asChild><Link href={ROUTES.product(product.slug)}><ShoppingCart className="h-3.5 w-3.5" /></Link></Button>;
  }
  const variant = product.variants[0];
  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (!variant || product.stockStatus === "out_of_stock") return;
    addItem({ productId: product.id, variantId: variant.id, product: { id: product.id, name: product.name, slug: product.slug, images: product.images }, variant: { id: variant.id, sku: variant.sku, price: variant.price, compareAtPrice: variant.compareAtPrice, attributes: variant.attributes, stock: variant.stock }, quantity: 1 });
    setAdded(true);
    toast({ description: `${product.name} added to cart`, duration: 2000 });
    setTimeout(() => setAdded(false), 1500);
  };
  return (
    <Button size="icon" variant="outline" className="h-8 w-8" onClick={handleAdd} disabled={product.stockStatus === "out_of_stock"}>
      {added ? <Check className="h-3.5 w-3.5 text-green-500" /> : <ShoppingCart className="h-3.5 w-3.5" />}
    </Button>
  );
}
