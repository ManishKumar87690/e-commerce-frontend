import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Cart, CartItem } from "@/types/cart";
import { APP_CONFIG } from "@/constants/config";

interface CartStore {
  items: CartItem[];
  couponCode: string | null;
  discount: number;
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string, discount: number) => void;
  removeCoupon: () => void;
  getCart: () => Cart;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      couponCode: null,
      discount: 0,
      addItem: (newItem) =>
        set((state) => {
          const existing = state.items.find((i) => i.variantId === newItem.variantId);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.variantId === newItem.variantId
                  ? { ...i, quantity: Math.min(i.quantity + newItem.quantity, APP_CONFIG.maxCartQuantity) }
                  : i
              ),
            };
          }
          return { items: [...state.items, { ...newItem, id: `ci-${Date.now()}-${Math.random().toString(36).slice(2)}` }] };
        }),
      removeItem: (variantId) => set((state) => ({ items: state.items.filter((i) => i.variantId !== variantId) })),
      updateQuantity: (variantId, quantity) =>
        set((state) => {
          if (quantity <= 0) return { items: state.items.filter((i) => i.variantId !== variantId) };
          return { items: state.items.map((i) => i.variantId === variantId ? { ...i, quantity: Math.min(quantity, APP_CONFIG.maxCartQuantity) } : i) };
        }),
      clearCart: () => set({ items: [], couponCode: null, discount: 0 }),
      applyCoupon: (code, discount) => set({ couponCode: code, discount }),
      removeCoupon: () => set({ couponCode: null, discount: 0 }),
      getCart: () => {
        const { items, couponCode, discount } = get();
        const subtotal = items.reduce((sum, item) => sum + item.variant.price * item.quantity, 0);
        const total = Math.max(0, subtotal - discount);
        return { id: "local-cart", items, subtotal, discount, discountCode: couponCode ?? undefined, total, itemCount: items.reduce((sum, item) => sum + item.quantity, 0) };
      },
      getItemCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    { name: "storefront-cart" }
  )
);
