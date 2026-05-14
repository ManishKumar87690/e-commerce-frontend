"use client";
import { useWishlistStore } from "@/store/wishlist.store";
export function WishlistBadge() {
  const count = useWishlistStore((s) => s.getCount());
  if (count === 0) return null;
  return (
    <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
      {count > 99 ? "99+" : count}
    </span>
  );
}
