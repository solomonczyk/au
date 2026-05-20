import { prisma } from "@/lib/prisma";
import { calculatePriceFromSpot } from "@/lib/services/product-pricing";
import { apiSuccess, apiError } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const idsParam = searchParams.get("ids");

  if (!idsParam) return apiError("INVALID_INPUT", "ids query parameter is required", 400);

  const productIds = idsParam.split(",").filter(Boolean);

  const [products, spot] = await Promise.all([
    prisma.product.findMany({
      where: { id: { in: productIds }, isActive: true },
      select: { id: true, weightTroyOz: true, markupPercent: true },
    }),
    prisma.goldPrice.findFirst({ orderBy: { fetchedAt: "desc" } }),
  ]);

  const spotPrice = spot ? Number(spot.xauUsd) : 0;

  const prices: Record<string, number> = {};
  for (const product of products) {
    prices[product.id] = calculatePriceFromSpot(
      spotPrice,
      Number(product.weightTroyOz),
      Number(product.markupPercent)
    );
  }

  return apiSuccess(prices);
}
