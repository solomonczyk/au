import { prisma } from "@/lib/prisma";
import { apiSuccess, apiValidationError, paginationMeta } from "@/lib/api-helpers";
import { ProductQuerySchema } from "@/lib/validations/product";
import { Prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = Object.fromEntries(searchParams.entries());

  const parsed = ProductQuerySchema.safeParse(query);
  if (!parsed.success) return apiValidationError(parsed.error);

  const { type, minWeight, maxWeight, minPrice, maxPrice, inStock, featured, sort, page, perPage } = parsed.data;

  const where: Prisma.ProductWhereInput = {
    isActive: true,
    ...(type && { type }),
    ...(minWeight !== undefined && { weightGrams: { gte: minWeight } }),
    ...(maxWeight !== undefined && { weightGrams: { lte: maxWeight } }),
    ...(inStock && { stockQuantity: { gt: 0 } }),
    ...(featured && { isFeatured: true }),
  };

  const orderBy: Prisma.ProductOrderByWithRelationInput = sort === "price_asc"
    ? { id: "asc" }
    : sort === "price_desc"
    ? { id: "desc" }
    : sort === "weight_asc"
    ? { weightGrams: "asc" }
    : { createdAt: "desc" };

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy,
      skip: (page - 1) * perPage,
      take: perPage,
      include: {
        images: { where: { isPrimary: true }, take: 1 },
        categories: { include: { category: true } },
      },
    }),
    prisma.product.count({ where }),
  ]);

  // For price filtering, we need spot price — apply client-side for now
  let filtered = products;
  if (minPrice !== undefined || maxPrice !== undefined) {
    const spot = await prisma.goldPrice.findFirst({ orderBy: { fetchedAt: "desc" } });
    const spotPrice = spot ? Number(spot.xauUsd) : 0;

    filtered = products.filter((p) => {
      const price = spotPrice * Number(p.weightTroyOz) * (1 + Number(p.markupPercent) / 100);
      if (minPrice !== undefined && price < minPrice) return false;
      if (maxPrice !== undefined && price > maxPrice) return false;
      return true;
    });
  }

  const data = filtered.map((p) => ({
    id: p.id,
    slug: p.slug,
    sku: p.sku,
    name: p.name,
    type: p.type.toLowerCase(),
    weightGrams: Number(p.weightGrams),
    weightTroyOz: Number(p.weightTroyOz),
    purityPercent: Number(p.purityPercent),
    manufacturer: p.manufacturer,
    stockQuantity: p.stockQuantity,
    inStock: p.stockQuantity > 0,
    isFeatured: p.isFeatured,
    primaryImage: p.images[0]?.url || null,
    categories: p.categories.map((pc) => pc.category.slug),
  }));

  return apiSuccess(data, {
    ...paginationMeta(total, page, perPage),
    filteredTotal: filtered.length,
  });
}
