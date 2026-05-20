import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return apiError("UNAUTHORIZED", "Authentication required", 401);

  const addresses = await prisma.address.findMany({
    where: { userId: session.user.id },
    orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }],
  });

  return apiSuccess(
    addresses.map((a) => ({ ...a, createdAt: a.createdAt.toISOString(), updatedAt: a.updatedAt.toISOString() }))
  );
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return apiError("UNAUTHORIZED", "Authentication required", 401);

  const body = await request.json();
  const { label, firstName, lastName, company, line1, line2, city, state, zipCode, country, phone, isDefault } = body;

  if (!firstName || !line1 || !city || !state || !zipCode) {
    return apiError("INVALID_INPUT", "firstName, line1, city, state, and zipCode are required", 400);
  }

  if (isDefault) {
    await prisma.address.updateMany({
      where: { userId: session.user.id },
      data: { isDefault: false },
    });
  }

  const address = await prisma.address.create({
    data: {
      userId: session.user.id,
      label: label || null,
      firstName,
      lastName: lastName || "",
      company: company || null,
      line1,
      line2: line2 || null,
      city,
      state,
      zipCode,
      country: country || "US",
      phone: phone || null,
      isDefault: isDefault || false,
    },
  });

  return apiSuccess(address, undefined, 201);
}
