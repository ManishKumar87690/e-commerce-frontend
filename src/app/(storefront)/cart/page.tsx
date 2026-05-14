import type { Metadata } from "next";
import { CartPageClient } from "@/features/cart/components/CartPageClient";

export const metadata: Metadata = { title: "Shopping Cart" };

export default function CartPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      <CartPageClient />
    </div>
  );
}
