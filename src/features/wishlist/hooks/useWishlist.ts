import { useWishlistStore } from "@/store/wishlist.store";
import { useToast } from "@/hooks/use-toast";
export function useWishlistToggle() {
  const { toggle, isInWishlist } = useWishlistStore();
  const { toast } = useToast();
  const toggleItem = (productId: string) => {
    const wasWishlisted = isInWishlist(productId);
    toggle(productId);
    toast({ description: wasWishlisted ? "Removed from wishlist" : "Added to wishlist", duration: 2000 });
  };
  return { toggleItem, isInWishlist };
}
