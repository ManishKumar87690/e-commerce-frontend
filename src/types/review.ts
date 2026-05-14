export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  body: string;
  isVerified: boolean;
  status: "pending" | "approved" | "rejected";
  helpfulCount: number;
  createdAt: string;
}
