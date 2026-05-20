import { getLatestGoldPrice } from "@/lib/services/gold-price";
import { calculatePriceFromSpot } from "@/lib/services/product-pricing";
import { apiSuccess, apiError } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const weightOz = parseFloat(searchParams.get("weightOz") || "0");
  const markupPct = parseFloat(searchParams.get("markupPct") || "0");

  if (weightOz <= 0) {
    return apiError("INVALID_WEIGHT", "weightOz must be greater than 0", 400);
  }

  const price = await getLatestGoldPrice();
  const totalPriceUsd = calculatePriceFromSpot(price.xauUsd, weightOz, markupPct);

  return apiSuccess({
    weightTroyOz: weightOz,
    spotPriceUsd: price.xauUsd,
    markupPct,
    totalPriceUsd,
  });
}
