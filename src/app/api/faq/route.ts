import { prisma } from "@/lib/prisma";
import { apiSuccess } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

export async function GET() {
  const faqs = await prisma.faqItem.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });

  return apiSuccess(faqs);
}
