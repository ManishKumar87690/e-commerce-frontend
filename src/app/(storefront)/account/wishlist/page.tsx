import type { Metadata } from "next";
import { WishlistPageClient } from "@/features/wishlist/components/WishlistPageClient";

export const metadata: Metadata = { title: "My Wishlist" };

export default function AccountWishlistPage() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold">Wishlist</h1><p className="text-muted-foreground text-sm mt-1">Products you&apos;ve saved for later</p></div>
      <WishlistPageClient />
    </div>
  );
}
