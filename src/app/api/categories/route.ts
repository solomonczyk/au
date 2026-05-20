import { prisma } from "@/lib/prisma";
import { apiSuccess } from "@/lib/api-helpers";

export async function GET() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  return apiSuccess(categories);
}
