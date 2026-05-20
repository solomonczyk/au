import { getPriceHistory } from "@/lib/services/gold-price";
import { apiSuccess, apiError } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const period = searchParams.get("period") || "1d";

  const validPeriods = ["1d", "1w", "1m", "6m", "1y", "5y"];
  if (!validPeriods.includes(period)) {
    return apiError("INVALID_PERIOD", "Period must be one of: 1d, 1w, 1m, 6m, 1y, 5y", 400);
  }

  const history = await getPriceHistory(period);
  return apiSuccess(history);
}
