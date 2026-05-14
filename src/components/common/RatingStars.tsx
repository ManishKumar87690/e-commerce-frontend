import { Star } from "lucide-react";
import { cn } from "@/lib/cn";
interface RatingStarsProps { rating: number; count?: number; size?: "sm" | "md" | "lg"; showCount?: boolean; }
export function RatingStars({ rating, count, size = "sm", showCount = true }: RatingStarsProps) {
  const sizes = { sm: "h-3.5 w-3.5", md: "h-4 w-4", lg: "h-5 w-5" };
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} className={cn(sizes[size], star <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "fill-muted text-muted-foreground/30")} />
        ))}
      </div>
      {showCount && count !== undefined && <span className="text-xs text-muted-foreground">({count})</span>}
    </div>
  );
}
