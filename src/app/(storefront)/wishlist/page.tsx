import type { Metadata } from "next";
import { WishlistPageClient } from "@/features/wishlist/components/WishlistPageClient";

export const metadata: Metadata = { title: "My Wishlist" };

export default function WishlistPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
      <WishlistPageClient />
    </div>
  );
}
