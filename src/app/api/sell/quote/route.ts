import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("productId");
  const weightOz = parseFloat(searchParams.get("weightOz") || "0");

  const spot = await prisma.goldPrice.findFirst({ orderBy: { fetchedAt: "desc" } });
  const spotPrice = spot ? Number(spot.xauUsd) : 0;

  if (productId) {
    const product = await prisma.product.findUnique({
      where: { id: productId, isActive: true },
      select: { id: true, name: true, weightTroyOz: true, buybackMarkupPct: true, type: true, purityPercent: true },
    });

    if (!product) return apiError("NOT_FOUND", "Product not found", 404);

    const buybackRate = (100 - Number(product.buybackMarkupPct)) / 100;
    const estimatedPayout = spotPrice * Number(product.weightTroyOz) * buybackRate;

    return apiSuccess({
      productId: product.id,
      productName: product.name,
      weightTroyOz: Number(product.weightTroyOz),
      type: product.type,
      purityPercent: Number(product.purityPercent),
      spotPriceUsd: spotPrice,
      buybackMarkupPct: Number(product.buybackMarkupPct),
      estimatedPayoutUsd: Number(estimatedPayout.toFixed(2)),
      disclaimer: "Final payout determined upon inspection. Prices may change.",
    });
  }

  if (weightOz > 0) {
    const buybackRate = 0.97; // default 3% below spot
    const estimatedPayout = spotPrice * weightOz * buybackRate;

    return apiSuccess({
      weightTroyOz: weightOz,
      spotPriceUsd: spotPrice,
      estimatedPayoutUsd: Number(estimatedPayout.toFixed(2)),
      buybackMarkupPct: 3,
      disclaimer: "Final offer depends on condition and purity assessment.",
    });
  }

  return apiError("INVALID_INPUT", "Provide productId or weightOz", 400);
}
