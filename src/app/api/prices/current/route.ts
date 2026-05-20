import { getLatestGoldPrice } from "@/lib/services/gold-price";
import { apiSuccess } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

export async function GET() {
  const price = await getLatestGoldPrice();
  return apiSuccess(price);
}
