import Stripe from "stripe";
import { env } from "./env";

export const stripe = env.STRIPE_SECRET_KEY
  ? new Stripe(env.STRIPE_SECRET_KEY, { apiVersion: "2026-04-22.dahlia" as const })
  : null;

export function getStripePublishableKey(): string {
  return env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "";
}
