import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

export const metadata: Metadata = { title: "Order Confirmed", robots: { index: false, follow: false } };

interface OrderSuccessProps { searchParams: Promise<{ orderId?: string }>; }

export default async function OrderSuccessPage({ searchParams }: OrderSuccessProps) {
  const { orderId } = await searchParams;
  return (
    <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] py-12 text-center">
      <div className="max-w-md space-y-6">
        <div className="flex justify-center"><CheckCircle2 className="h-20 w-20 text-green-500" /></div>
        <div>
          <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground">Thank you for your purchase. Your order has been placed successfully.</p>
        </div>
        {orderId && <div className="rounded-lg bg-muted p-4"><p className="text-sm text-muted-foreground">Order ID</p><p className="font-mono font-semibold">{orderId}</p></div>}
        <p className="text-sm text-muted-foreground">A confirmation email will be sent to your registered email address.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild><Link href={ROUTES.orders}>Track Order</Link></Button>
          <Button variant="outline" asChild><Link href={ROUTES.products}>Continue Shopping</Link></Button>
        </div>
      </div>
    </div>
  );
}
