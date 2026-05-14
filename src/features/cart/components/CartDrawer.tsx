"use client";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Trash2, ArrowRight } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { QuantitySelector } from "@/components/product/QuantitySelector";
import { useCartStore } from "@/store/cart.store";
import { useUIStore } from "@/store/ui.store";
import { formatPrice } from "@/lib/format";
import { ROUTES } from "@/constants/routes";
import { APP_CONFIG } from "@/constants/config";

export function CartDrawer() {
  const { cartDrawerOpen, setCartDrawerOpen } = useUIStore();
  const { getCart, removeItem, updateQuantity } = useCartStore();
  const cart = getCart();
  const freeShippingRemaining = Math.max(0, APP_CONFIG.freeShippingThreshold - cart.subtotal);
  const freeShippingProgress = Math.min(100, (cart.subtotal / APP_CONFIG.freeShippingThreshold) * 100);

  return (
    <Sheet open={cartDrawerOpen} onOpenChange={setCartDrawerOpen}>
      <SheetContent className="flex flex-col w-full sm:max-w-md p-0">
        <SheetHeader className="px-6 py-4 border-b">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />Cart
            {cart.itemCount > 0 && <span className="ml-auto text-sm font-normal text-muted-foreground">{cart.itemCount} item{cart.itemCount !== 1 ? "s" : ""}</span>}
          </SheetTitle>
        </SheetHeader>
        {cart.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 gap-4 px-6">
            <ShoppingCart className="h-16 w-16 text-muted-foreground/30" />
            <p className="font-medium">Your cart is empty</p>
            <Button onClick={() => setCartDrawerOpen(false)} asChild><Link href={ROUTES.products}>Start Shopping</Link></Button>
          </div>
        ) : (
          <>
            {freeShippingRemaining > 0 && (
              <div className="px-6 py-3 bg-muted/50">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground">Add <strong className="text-foreground">{formatPrice(freeShippingRemaining)}</strong> for free shipping</span>
                  <span className="text-muted-foreground">{Math.round(freeShippingProgress)}%</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${freeShippingProgress}%` }} />
                </div>
              </div>
            )}
            {freeShippingRemaining === 0 && (
              <div className="px-6 py-2 bg-green-50 dark:bg-green-950/30 text-center">
                <p className="text-xs text-green-700 dark:text-green-400 font-medium">🎉 You qualify for free shipping!</p>
              </div>
            )}
            <ScrollArea className="flex-1 px-6">
              <div className="py-4 space-y-4">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <Link href={ROUTES.product(item.product.slug)} onClick={() => setCartDrawerOpen(false)} className="relative w-16 h-16 rounded-md overflow-hidden bg-muted shrink-0">
                      <Image src={item.product.images[0]} alt={item.product.name} fill sizes="64px" className="object-cover" />
                    </Link>
                    <div className="flex-1 min-w-0 space-y-1">
                      <Link href={ROUTES.product(item.product.slug)} onClick={() => setCartDrawerOpen(false)} className="text-sm font-medium line-clamp-2 hover:text-primary transition-colors">{item.product.name}</Link>
                      <div className="flex flex-wrap gap-x-2">
                        {Object.entries(item.variant.attributes).map(([, v]) => <span key={v} className="text-xs text-muted-foreground capitalize">{v}</span>)}
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <QuantitySelector value={item.quantity} onChange={(qty) => updateQuantity(item.variantId, qty)} max={item.variant.stock} />
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold">{formatPrice(item.variant.price * item.quantity)}</span>
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive" onClick={() => removeItem(item.variantId)}><Trash2 className="h-3.5 w-3.5" /></Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="px-6 py-4 border-t space-y-4">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatPrice(cart.subtotal)}</span></div>
                {cart.discount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>-{formatPrice(cart.discount)}</span></div>}
                <div className="flex justify-between font-semibold text-base"><span>Total</span><span>{formatPrice(cart.total)}</span></div>
              </div>
              <div className="space-y-2">
                <Button className="w-full gap-2" asChild onClick={() => setCartDrawerOpen(false)}><Link href={ROUTES.checkout}>Checkout <ArrowRight className="h-4 w-4" /></Link></Button>
                <Button variant="outline" className="w-full" asChild onClick={() => setCartDrawerOpen(false)}><Link href={ROUTES.cart}>View Cart</Link></Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
