import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistStore {
  productIds: Set<string>;
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  toggle: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  getCount: () => number;
  clear: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      productIds: new Set(),
      addItem: (productId) => set((state) => ({ productIds: new Set([...state.productIds, productId]) })),
      removeItem: (productId) => set((state) => { const next = new Set(state.productIds); next.delete(productId); return { productIds: next }; }),
      toggle: (productId) => { const { productIds } = get(); if (productIds.has(productId)) { get().removeItem(productId); } else { get().addItem(productId); } },
      isInWishlist: (productId) => get().productIds.has(productId),
      getCount: () => get().productIds.size,
      clear: () => set({ productIds: new Set() }),
    }),
    {
      name: "storefront-wishlist",
      storage: {
        getItem: (key) => {
          const str = localStorage.getItem(key);
          if (!str) return null;
          const parsed = JSON.parse(str);
          return { ...parsed, state: { ...parsed.state, productIds: new Set(parsed.state.productIds) } };
        },
        setItem: (key, value) => {
          const serialized = { ...value, state: { ...value.state, productIds: [...value.state.productIds] } };
          localStorage.setItem(key, JSON.stringify(serialized));
        },
        removeItem: (key) => localStorage.removeItem(key),
      },
    }
  )
);
