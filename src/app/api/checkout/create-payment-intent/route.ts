import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { apiSuccess, apiError } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

function generateOrderNumber(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `AG-${ts}-${rand}`;
}

export async function POST(request: Request) {
  const session = await auth();

  const body = await request.json();
  const { items, shippingAddress, shippingMethod, guestEmail, guestPhone } = body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return apiError("INVALID_INPUT", "Items are required", 400);
  }

  if (!shippingAddress) {
    return apiError("INVALID_INPUT", "Shipping address is required", 400);
  }

  if (!session?.user?.id && !guestEmail) {
    return apiError("INVALID_INPUT", "Email is required for guest checkout", 400);
  }

  const productIds = items.map((i: { productId: string }) => i.productId);
  const products = await prisma.product.findMany({
    where: { id: { in: productIds }, isActive: true },
  });

  if (products.length !== productIds.length) {
    return apiError("INVALID_INPUT", "One or more products not found", 400);
  }

  const spot = await prisma.goldPrice.findFirst({ orderBy: { fetchedAt: "desc" } });
  const spotPrice = spot ? Number(spot.xauUsd) : 0;

  let subtotalUsd = 0;
  const orderItemsData: {
    productId: string;
    productName: string;
    productSku: string;
    quantity: number;
    unitPriceUsd: number;
    spotPriceAtOrder: number;
    subtotalUsd: number;
  }[] = [];

  for (const item of items) {
    const product = products.find((p) => p.id === item.productId);
    if (!product) continue;

    const unitPrice = spotPrice * Number(product.weightTroyOz) * (1 + Number(product.markupPercent) / 100);
    const lineTotal = unitPrice * item.quantity;
    subtotalUsd += lineTotal;

    orderItemsData.push({
      productId: product.id,
      productName: product.name,
      productSku: product.sku,
      quantity: item.quantity,
      unitPriceUsd: Number(unitPrice.toFixed(2)),
      spotPriceAtOrder: spotPrice,
      subtotalUsd: Number(lineTotal.toFixed(2)),
    });
  }

  const shippingCostUsd = shippingMethod === "FEDEX_OVERNIGHT" || shippingMethod === "UPS_OVERNIGHT" ? 35 : 15;
  const salesTaxUsd = 0;
  const totalUsd = Number((subtotalUsd + shippingCostUsd + salesTaxUsd).toFixed(2));

  if (!stripe) {
    return apiError("STRIPE_NOT_CONFIGURED", "Payment system is not configured", 500);
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(totalUsd * 100),
    currency: "usd",
    automatic_payment_methods: { enabled: true },
    metadata: {
      orderNumber: "",
    },
  });

  let addressId = shippingAddress.id || null;

  if (!addressId && session?.user?.id) {
    const created = await prisma.address.create({
      data: {
        userId: session.user.id,
        firstName: shippingAddress.firstName,
        lastName: shippingAddress.lastName,
        line1: shippingAddress.line1,
        line2: shippingAddress.line2 || "",
        city: shippingAddress.city,
        state: shippingAddress.state,
        zipCode: shippingAddress.zipCode,
        country: shippingAddress.country || "US",
        phone: shippingAddress.phone || "",
      },
    });
    addressId = created.id;
  }

  const orderNumber = generateOrderNumber();

  await prisma.order.create({
    data: {
      orderNumber,
      userId: session?.user?.id || null,
      guestEmail: guestEmail || null,
      guestPhone: guestPhone || null,
      status: "PAYMENT_PENDING",
      paymentStatus: "PENDING",
      shippingAddressId: addressId,
      shippingMethod: shippingMethod || "FEDEX_GROUND",
      subtotalUsd: Number(subtotalUsd.toFixed(2)),
      salesTaxUsd,
      shippingCostUsd,
      totalUsd,
      goldSpotAtOrderUsd: spotPrice,
      stripePaymentIntentId: paymentIntent.id,
      items: {
        create: orderItemsData,
      },
    },
  });

  await stripe.paymentIntents.update(paymentIntent.id, {
    metadata: { orderNumber },
  });

  return apiSuccess({
    clientSecret: paymentIntent.client_secret,
    paymentIntentId: paymentIntent.id,
    orderNumber,
    totalUsd,
  });
}
