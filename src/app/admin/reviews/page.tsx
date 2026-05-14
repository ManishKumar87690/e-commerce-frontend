"use client";
import { useState } from "react";
import { Check, X, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { formatRelativeDate } from "@/lib/format";
import { getInitials } from "@/lib/utils";
import type { Review } from "@/types/review";

const MOCK_REVIEWS: Review[] = [
  { id: "rev-1", productId: "prod-1", userId: "user-2", userName: "John Doe", rating: 5, title: "Excellent shoes!", body: "These are the best running shoes I've ever owned. Super comfortable and stylish.", isVerified: true, status: "pending", helpfulCount: 3, createdAt: "2024-06-01T10:00:00Z" },
  { id: "rev-2", productId: "prod-2", userId: "user-3", userName: "Jane Smith", rating: 4, title: "Great phone, minor issues", body: "Love the titanium design and camera quality. Battery could be better.", isVerified: true, status: "pending", helpfulCount: 7, createdAt: "2024-06-10T14:00:00Z" },
  { id: "rev-3", productId: "prod-3", userId: "user-4", userName: "Bob Wilson", rating: 3, title: "Decent but overpriced", body: "Good noise canceling but the price is too high for what you get.", isVerified: false, status: "approved", helpfulCount: 1, createdAt: "2024-05-20T09:00:00Z" },
];

const PRODUCT_NAMES: Record<string, string> = { "prod-1": "Air Max 270", "prod-2": "iPhone 15 Pro", "prod-3": "Sony WH-1000XM5" };

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("pending");
  const { toast } = useToast();
  const filteredReviews = reviews.filter((r) => filter === "all" || r.status === filter);
  const updateStatus = (id: string, status: "approved" | "rejected") => { setReviews((prev) => prev.map((r) => r.id === id ? { ...r, status } : r)); toast({ description: `Review ${status}.` }); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold">Reviews</h1><p className="text-sm text-muted-foreground">{reviews.filter((r) => r.status === "pending").length} pending moderation</p></div>
        <Select value={filter} onValueChange={(v) => setFilter(v as typeof filter)}>
          <SelectTrigger className="w-36 h-9"><SelectValue /></SelectTrigger>
          <SelectContent><SelectItem value="all">All reviews</SelectItem><SelectItem value="pending">Pending</SelectItem><SelectItem value="approved">Approved</SelectItem><SelectItem value="rejected">Rejected</SelectItem></SelectContent>
        </Select>
      </div>
      <div className="space-y-4">
        {filteredReviews.length === 0 && <div className="text-center py-12 text-muted-foreground border rounded-lg">No reviews in this status.</div>}
        {filteredReviews.map((review) => (
          <div key={review.id} className="rounded-lg border bg-card p-5 space-y-3">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9"><AvatarFallback className="text-xs bg-primary/10 text-primary">{getInitials(review.userName)}</AvatarFallback></Avatar>
                <div>
                  <div className="flex items-center gap-2"><p className="font-medium text-sm">{review.userName}</p>{review.isVerified && <Badge variant="outline" className="text-xs text-green-600 border-green-300 py-0">Verified</Badge>}{review.status === "pending" && <Badge variant="secondary" className="text-xs py-0">Pending</Badge>}</div>
                  <p className="text-xs text-muted-foreground">{PRODUCT_NAMES[review.productId] ?? review.productId} · {formatRelativeDate(review.createdAt)}</p>
                </div>
              </div>
              <Badge variant={review.status === "approved" ? "default" : review.status === "rejected" ? "destructive" : "secondary"} className="capitalize text-xs">{review.status}</Badge>
            </div>
            <div className="flex items-center gap-0.5">{[1,2,3,4,5].map((s) => <Star key={s} className={`h-3.5 w-3.5 ${s <= review.rating ? "fill-amber-400 text-amber-400" : "fill-muted text-muted-foreground/30"}`} />)}</div>
            <div><p className="font-medium text-sm">{review.title}</p><p className="text-sm text-muted-foreground mt-1 leading-relaxed">{review.body}</p></div>
            {review.status === "pending" && (
              <div className="flex gap-2 pt-1">
                <Button size="sm" className="gap-1.5 h-8" onClick={() => updateStatus(review.id, "approved")}><Check className="h-3.5 w-3.5" />Approve</Button>
                <Button variant="destructive" size="sm" className="gap-1.5 h-8" onClick={() => updateStatus(review.id, "rejected")}><X className="h-3.5 w-3.5" />Reject</Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
