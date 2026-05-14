import { z } from "zod";

export const reviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  title: z.string().min(3, "Title is required").max(100),
  body: z.string().min(10, "Review must be at least 10 characters").max(2000),
});

export type ReviewInput = z.infer<typeof reviewSchema>;
