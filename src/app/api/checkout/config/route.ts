import { getStripePublishableKey } from "@/lib/stripe";
import { apiSuccess } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

export async function GET() {
  return apiSuccess({
    publishableKey: getStripePublishableKey(),
  });
}
