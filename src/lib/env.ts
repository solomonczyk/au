import { z } from "zod";

const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url(),

  // Auth
  NEXTAUTH_URL: z.string().url().default("http://localhost:3000"),
  NEXTAUTH_SECRET: z.string().min(32),
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),

  // Stripe
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().optional(),
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),

  // nFusion Gold Price API
  NFUSION_API_KEY: z.string().optional(),

  // Email (Resend)
  RESEND_API_KEY: z.string().optional(),
  EMAIL_FROM: z.string().email().default("noreply@aureumgold.com"),

  // Site
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_SITE_NAME: z.string().default("AUREUM GOLD"),

  // Encryption
  ENCRYPTION_KEY: z.string().optional(),
});

// Use safeParse so missing env vars at build time don't crash static generation
const result = envSchema.safeParse(process.env);
export const env = result.success
  ? result.data
  : (process.env as unknown as z.infer<typeof envSchema>);

export type Env = z.infer<typeof envSchema>;
