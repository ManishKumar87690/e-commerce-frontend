"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CreditCard, Banknote, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { checkoutSchema, type CheckoutInput } from "@/schemas/checkout.schema";
import { useCartStore } from "@/store/cart.store";
import { formatPrice } from "@/lib/format";
import { APP_CONFIG } from "@/constants/config";
import { ROUTES } from "@/constants/routes";
import { useToast } from "@/hooks/use-toast";
import { wait } from "@/lib/utils";

const PAYMENT_METHODS = [
  { value: "card", label: "Credit / Debit Card", icon: CreditCard },
  { value: "paypal", label: "PayPal", icon: Wallet },
  { value: "cod", label: "Cash on Delivery", icon: Banknote },
] as const;

export function CheckoutClient() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { getCart, clearCart } = useCartStore();
  const cart = getCart();
  const { toast } = useToast();

  const form = useForm<CheckoutInput>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { shippingAddress: { fullName: "", phone: "", addressLine1: "", addressLine2: "", city: "", state: "", postalCode: "", country: "US", isDefault: false }, paymentMethod: "card", notes: "", saveAddress: false },
  });

  const onSubmit = async (_values: CheckoutInput) => {
    if (cart.items.length === 0) { toast({ description: "Your cart is empty.", variant: "destructive" }); return; }
    setIsSubmitting(true);
    await wait(1500);
    const orderId = `ord-${Date.now()}`;
    clearCart();
    router.push(ROUTES.orderSuccess(orderId));
    setIsSubmitting(false);
  };

  const shippingCost = cart.subtotal >= APP_CONFIG.freeShippingThreshold ? 0 : APP_CONFIG.shippingCost;
  const tax = (cart.total + shippingCost) * APP_CONFIG.taxRate;
  const grandTotal = cart.total + shippingCost + tax;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Address */}
            <div className="rounded-lg border bg-card p-6 space-y-4">
              <h2 className="font-semibold text-lg">Shipping Address</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField control={form.control} name="shippingAddress.fullName" render={({ field }) => (<FormItem><FormLabel>Full name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="shippingAddress.phone" render={({ field }) => (<FormItem><FormLabel>Phone number</FormLabel><FormControl><Input type="tel" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="shippingAddress.addressLine1" render={({ field }) => (<FormItem className="sm:col-span-2"><FormLabel>Address line 1</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="shippingAddress.addressLine2" render={({ field }) => (<FormItem className="sm:col-span-2"><FormLabel>Address line 2 <span className="text-muted-foreground text-xs">(optional)</span></FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="shippingAddress.city" render={({ field }) => (<FormItem><FormLabel>City</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="shippingAddress.state" render={({ field }) => (<FormItem><FormLabel>State</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="shippingAddress.postalCode" render={({ field }) => (<FormItem><FormLabel>Postal code</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="shippingAddress.country" render={({ field }) => (<FormItem><FormLabel>Country</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
              </div>
            </div>
            {/* Payment */}
            <div className="rounded-lg border bg-card p-6 space-y-4">
              <h2 className="font-semibold text-lg">Payment Method</h2>
              <FormField control={form.control} name="paymentMethod" render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup value={field.value} onValueChange={field.onChange} className="space-y-2">
                      {PAYMENT_METHODS.map(({ value, label, icon: Icon }) => (
                        <Label key={value} htmlFor={`payment-${value}`} className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-muted has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                          <RadioGroupItem value={value} id={`payment-${value}`} /><Icon className="h-4 w-4" /><span className="text-sm font-medium">{label}</span>
                        </Label>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              {form.watch("paymentMethod") === "card" && (
                <div className="space-y-3 pt-2">
                  <div><Label className="text-sm">Card number</Label><Input placeholder="1234 5678 9012 3456" className="mt-1.5" /></div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><Label className="text-sm">Expiry</Label><Input placeholder="MM / YY" className="mt-1.5" /></div>
                    <div><Label className="text-sm">CVV</Label><Input placeholder="123" className="mt-1.5" /></div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Order Summary */}
          <div>
            <div className="rounded-lg border bg-card p-6 space-y-4 sticky top-24">
              <h2 className="font-semibold text-lg">Order Summary</h2>
              <div className="space-y-2 text-sm max-h-64 overflow-y-auto">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex justify-between gap-2">
                    <span className="text-muted-foreground line-clamp-2 flex-1">{item.product.name} × {item.quantity}</span>
                    <span className="shrink-0">{formatPrice(item.variant.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <Separator />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatPrice(cart.subtotal)}</span></div>
                {cart.discount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>-{formatPrice(cart.discount)}</span></div>}
                <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shippingCost === 0 ? <span className="text-green-600">Free</span> : formatPrice(shippingCost)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Tax (8%)</span><span>{formatPrice(tax)}</span></div>
                <Separator />
                <div className="flex justify-between font-semibold text-base"><span>Total</span><span>{formatPrice(grandTotal)}</span></div>
              </div>
              <Button type="submit" size="lg" className="w-full gap-2" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {isSubmitting ? "Placing Order…" : `Pay ${formatPrice(grandTotal)}`}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
