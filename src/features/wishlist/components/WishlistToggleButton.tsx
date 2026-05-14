"use client";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWishlistStore } from "@/store/wishlist.store";
import { cn } from "@/lib/cn";
import { useToast } from "@/hooks/use-toast";

interface WishlistToggleButtonProps {
  productId: string;
  size?: "icon" | "icon-sm" | "default";
}

export function WishlistToggleButton({ productId, size = "icon" }: WishlistToggleButtonProps) {
  const { toggle, isInWishlist } = useWishlistStore();
  const { toast } = useToast();
  const isWishlisted = isInWishlist(productId);
  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(productId);
    toast({
      description: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      duration: 2000,
    });
  };
  return (
    <Button
      variant="outline"
      size={size === "icon-sm" ? "icon" : size}
      className={cn("bg-background/80 backdrop-blur-sm", size === "icon-sm" && "h-8 w-8")}
      onClick={handleToggle}
      aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart
        className={cn(
          "h-4 w-4 transition-colors",
          isWishlisted ? "fill-rose-500 text-rose-500" : "text-muted-foreground"
        )}
      />
    </Button>
  );
}
