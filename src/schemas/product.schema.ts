import { z } from "zod";

export const productVariantSchema = z.object({
  sku: z.string().min(1, "SKU is required"),
  price: z.number().positive("Price must be positive"),
  compareAtPrice: z.number().positive().optional().nullable(),
  stock: z.number().int().min(0, "Stock cannot be negative"),
  attributes: z.record(z.string()),
  images: z.array(z.string().url()).optional(),
});

export const productSchema = z.object({
  name: z.string().min(2, "Name is required").max(200),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/, "Slug: only lowercase letters, numbers, hyphens"),
  description: z.string().min(10, "Description is required"),
  shortDescription: z.string().max(300).optional(),
  images: z.array(z.string()).min(1, "At least one image is required"),
  categoryId: z.string().min(1, "Category is required"),
  brandId: z.string().optional(),
  tags: z.array(z.string()).default([]),
  status: z.enum(["active", "draft", "archived"]).default("draft"),
  featured: z.boolean().default(false),
  variants: z.array(productVariantSchema).min(1, "At least one variant is required"),
  seo: z.object({
    title: z.string().max(60).optional(),
    description: z.string().max(160).optional(),
    keywords: z.array(z.string()).optional(),
  }).optional(),
});

export type ProductInput = z.infer<typeof productSchema>;
export type ProductVariantInput = z.infer<typeof productVariantSchema>;
