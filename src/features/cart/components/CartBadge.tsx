"use client";
import { useCartStore } from "@/store/cart.store";
export function CartBadge() {
  const count = useCartStore((s) => s.getItemCount());
  if (count === 0) return null;
  return <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">{count > 99 ? "99+" : count}</span>;
}
