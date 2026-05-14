import { z } from "zod";

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const productListParamsSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  category: z.string().optional(),
  brand: z.string().optional(),
  search: z.string().optional(),
  minPrice: z.coerce.number().positive().optional(),
  maxPrice: z.coerce.number().positive().optional(),
  sort: z.enum(["newest", "oldest", "price_asc", "price_desc", "rating", "popular"]).default("newest"),
  inStock: z.coerce.boolean().optional(),
  featured: z.coerce.boolean().optional(),
});

export type PaginationInput = z.infer<typeof paginationSchema>;
export type ProductListParamsInput = z.infer<typeof productListParamsSchema>;
