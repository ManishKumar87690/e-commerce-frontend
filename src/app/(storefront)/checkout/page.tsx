import type { Metadata } from "next";
import { CheckoutClient } from "@/features/checkout/components/CheckoutClient";

export const metadata: Metadata = { title: "Checkout", robots: { index: false, follow: false } };

export default function CheckoutPage() {
  return (
    <div className="container max-w-5xl py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <CheckoutClient />
    </div>
  );
}
