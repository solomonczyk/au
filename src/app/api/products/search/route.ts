import { prisma } from "@/lib/prisma";
import { apiSuccess, apiValidationError } from "@/lib/api-helpers";
import { ProductSearchSchema } from "@/lib/validations/product";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = Object.fromEntries(searchParams.entries());

  const parsed = ProductSearchSchema.safeParse(query);
  if (!parsed.success) return apiValidationError(parsed.error);

  const { q, limit } = parsed.data;

  const products = await prisma.product.findMany({
    where: {
      isActive: true,
      OR: [
        { name: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
        { sku: { contains: q, mode: "insensitive" } },
      ],
    },
    take: limit,
    include: {
      images: { where: { isPrimary: true }, take: 1 },
    },
  });

  const results = products.map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    sku: p.sku,
    type: p.type.toLowerCase(),
    weightGrams: Number(p.weightGrams),
    weightTroyOz: Number(p.weightTroyOz),
    primaryImage: p.images[0]?.url || null,
  }));

  return apiSuccess({
    results,
    total: results.length,
    query: q,
  });
}
