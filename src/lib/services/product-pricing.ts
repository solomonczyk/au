import { prisma } from "@/lib/prisma";

export async function calculateProductPrice(productId: string) {
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) return null;

  const spot = await prisma.goldPrice.findFirst({
    orderBy: { fetchedAt: "desc" },
  });

  const spotPrice = spot ? Number(spot.xauUsd) : 0;
  const weightOz = Number(product.weightTroyOz);
  const markup = Number(product.markupPercent);
  const buybackMarkup = Number(product.buybackMarkupPct);

  const priceUsd = spotPrice * weightOz * (1 + markup / 100);
  const buybackPriceUsd = spotPrice * weightOz * (1 + buybackMarkup / 100);

  return {
    productId: product.id,
    productName: product.name,
    weightTroyOz: weightOz,
    spotPriceUsd: spotPrice,
    markupPercent: markup,
    priceUsd: Number(priceUsd.toFixed(2)),
    buybackPriceUsd: Number(buybackPriceUsd.toFixed(2)),
  };
}

export function calculatePriceFromSpot(
  spotPriceUsd: number,
  weightTroyOz: number,
  markupPercent: number
): number {
  return Number((spotPriceUsd * weightTroyOz * (1 + markupPercent / 100)).toFixed(2));
}
