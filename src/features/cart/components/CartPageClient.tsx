"use client";
import Link from "next/link";
import Image from "next/image";
import { Trash2, ArrowRight, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { QuantitySelector } from "@/components/product/QuantitySelector";
import { EmptyState } from "@/components/common/EmptyState";
import { useCartStore } from "@/store/cart.store";
import { formatPrice } from "@/lib/format";
import { ROUTES } from "@/constants/routes";
import { APP_CONFIG } from "@/constants/config";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function CartPageClient() {
  const { getCart, removeItem, updateQuantity, applyCoupon, removeCoupon } = useCartStore();
  const cart = getCart();
  const { toast } = useToast();
  const [couponInput, setCouponInput] = useState("");

  const MOCK_COUPONS: Record<string, number> = { SAVE10: 10, SAVE15: 15, SAVE50: 50, WELCOME20: 20 };

  const handleApplyCoupon = () => {
    if (!couponInput.trim()) return;
    const discount = MOCK_COUPONS[couponInput.toUpperCase()];
    if (discount) {
      applyCoupon(couponInput.toUpperCase(), discount);
      toast({ description: `Coupon applied! You saved ${formatPrice(discount)}` });
      setCouponInput("");
    } else {
      toast({ description: "Invalid or expired coupon code.", variant: "destructive" });
    }
  };

  if (cart.items.length === 0) {
    return <EmptyState icon={ShoppingCart} title="Your cart is empty" description="Looks like you haven't added anything to your cart yet." actionLabel="Start shopping" actionHref={ROUTES.products} />;
  }

  const shippingCost = cart.subtotal >= APP_CONFIG.freeShippingThreshold ? 0 : APP_CONFIG.shippingCost;
  const freeShippingRemaining = Math.max(0, APP_CONFIG.freeShippingThreshold - cart.subtotal);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        {freeShippingRemaining > 0 && (
          <div className="rounded-lg bg-muted p-3 text-sm">Add <strong>{formatPrice(freeShippingRemaining)}</strong> more for free shipping!</div>
        )}
        {cart.items.map((item) => (
          <div key={item.id} className="flex gap-4 p-4 rounded-lg border bg-card">
            <Link href={ROUTES.product(item.product.slug)} className="relative w-20 h-20 rounded-md overflow-hidden bg-muted shrink-0">
              <Image src={item.product.images[0]} alt={item.product.name} fill sizes="80px" className="object-cover" />
            </Link>
            <div className="flex-1 min-w-0">
              <Link href={ROUTES.product(item.product.slug)} className="font-medium text-sm hover:text-primary line-clamp-2">{item.product.name}</Link>
              <div className="flex flex-wrap gap-1 mt-1">
                {Object.entries(item.variant.attributes).map(([k, v]) => <span key={k} className="text-xs text-muted-foreground capitalize">{v}</span>)}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">SKU: {item.variant.sku}</p>
              <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
                <QuantitySelector value={item.quantity} onChange={(qty) => updateQuantity(item.variantId, qty)} max={item.variant.stock} />
                <div className="flex items-center gap-3">
                  <span className="font-semibold">{formatPrice(item.variant.price * item.quantity)}</span>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => removeItem(item.variantId)}><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="space-y-4">
        <div className="rounded-lg border bg-card p-6 space-y-4">
          <h2 className="font-semibold text-lg">Order Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal ({cart.itemCount} items)</span><span>{formatPrice(cart.subtotal)}</span></div>
            {cart.discount > 0 && <div className="flex justify-between text-green-600"><span>Discount ({cart.discountCode})</span><span>-{formatPrice(cart.discount)}</span></div>}
            <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shippingCost === 0 ? <span className="text-green-600">Free</span> : formatPrice(shippingCost)}</span></div>
            <Separator />
            <div className="flex justify-between font-semibold text-base"><span>Total</span><span>{formatPrice(cart.total + shippingCost)}</span></div>
          </div>
          <div className="space-y-2">
            {cart.discountCode ? (
              <div className="flex items-center justify-between bg-green-50 dark:bg-green-950/30 rounded p-2 text-sm">
                <span className="text-green-700 dark:text-green-400 font-mono">{cart.discountCode}</span>
                <Button variant="ghost" size="sm" className="h-6 text-xs" onClick={removeCoupon}>Remove</Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Input placeholder="Coupon code" value={couponInput} onChange={(e) => setCouponInput(e.target.value)} className="h-9 text-sm" onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()} />
                <Button variant="outline" size="sm" onClick={handleApplyCoupon}>Apply</Button>
              </div>
            )}
          </div>
          <Button size="lg" className="w-full gap-2" asChild><Link href={ROUTES.checkout}>Proceed to Checkout <ArrowRight className="h-4 w-4" /></Link></Button>
          <Button variant="ghost" size="sm" className="w-full" asChild><Link href={ROUTES.products}>Continue Shopping</Link></Button>
        </div>
      </div>
    </div>
  );
}
