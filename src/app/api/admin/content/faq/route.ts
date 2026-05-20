import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await auth();
  if ((session?.user as { role?: string })?.role !== "ADMIN") return apiError("FORBIDDEN", "Admin access required", 403);

  const faqs = await prisma.faqItem.findMany({ orderBy: { sortOrder: "asc" } });
  return apiSuccess(faqs);
}

export async function POST(request: Request) {
  const session = await auth();
  if ((session?.user as { role?: string })?.role !== "ADMIN") return apiError("FORBIDDEN", "Admin access required", 403);

  const body = await request.json();
  const { question, answer, category, sortOrder, isActive } = body;

  if (!question || !answer) return apiError("INVALID_INPUT", "question and answer are required", 400);

  const faq = await prisma.faqItem.create({
    data: { question, answer, category: category || null, sortOrder: sortOrder || 0, isActive: isActive ?? true },
  });

  return apiSuccess(faq, undefined, 201);
}
