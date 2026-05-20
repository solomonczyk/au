import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { apiError } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(request: Request) {
  if (!stripe) {
    return apiError("STRIPE_NOT_CONFIGURED", "Payment system is not configured", 500);
  }

  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return apiError("BAD_REQUEST", "Missing stripe-signature header", 400);
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret || "");
  } catch (err) {
    console.error("Stripe webhook signature verification failed:", err);
    return apiError("BAD_REQUEST", "Invalid signature", 400);
  }

  try {
    switch (event.type) {
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object;
        const orderNumber = paymentIntent.metadata?.orderNumber;
        if (!orderNumber) break;

        await prisma.order.update({
          where: { orderNumber },
          data: {
            status: "PAID",
            paymentStatus: "CAPTURED",
            stripeChargeId: String(paymentIntent.latest_charge || ""),
          },
        });

        await prisma.orderStatusHistory.create({
          data: {
            orderId: orderNumber,
            status: "PAID",
            changedBy: "stripe-webhook",
          },
        });
        break;
      }

      case "payment_intent.payment_failed": {
        const failedIntent = event.data.object;
        const failedOrderNumber = failedIntent.metadata?.orderNumber;
        if (!failedOrderNumber) break;

        await prisma.order.update({
          where: { orderNumber: failedOrderNumber },
          data: {
            paymentStatus: "FAILED",
          },
        });
        break;
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Webhook handler error:", error);
    return apiError("WEBHOOK_ERROR", "Handler error", 500);
  }
}
