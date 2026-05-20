import { updateGoldPriceInDb } from "@/lib/services/gold-price";
import { apiSuccess, apiError } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(request: Request) {
  // Verify cron secret if configured
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return apiError("UNAUTHORIZED", "Invalid cron secret", 401);
  }

  const result = await updateGoldPriceInDb();

  if (result) {
    return apiSuccess({
      message: "Gold price updated",
      xauUsd: result.xauUsd,
    });
  }

  return apiError("PRICE_FETCH_FAILED", "Could not fetch gold price", 502);
}
