import { z } from "zod";

export const ProductQuerySchema = z.object({
  type: z.enum(["BAR", "COIN", "ROUND", "PLATE"]).optional(),
  minWeight: z.coerce.number().optional(),
  maxWeight: z.coerce.number().optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  inStock: z.coerce.boolean().optional(),
  featured: z.coerce.boolean().optional(),
  sort: z.enum(["price_asc", "price_desc", "weight_asc", "newest"]).optional(),
  page: z.coerce.number().int().min(1).default(1),
  perPage: z.coerce.number().int().min(1).max(50).default(20),
});

export const ProductSearchSchema = z.object({
  q: z.string().min(1),
  limit: z.coerce.number().int().min(1).max(20).default(10),
});

export type ProductQuery = z.infer<typeof ProductQuerySchema>;
export type ProductSearch = z.infer<typeof ProductSearchSchema>;
