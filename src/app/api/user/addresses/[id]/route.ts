import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) return apiError("UNAUTHORIZED", "Authentication required", 401);

  const { id } = await params;

  const existing = await prisma.address.findFirst({ where: { id, userId: session.user.id } });
  if (!existing) return apiError("NOT_FOUND", "Address not found", 404);

  const body = await request.json();

  if (body.isDefault) {
    await prisma.address.updateMany({
      where: { userId: session.user.id },
      data: { isDefault: false },
    });
  }

  const { label, firstName, lastName, company, line1, line2, city, state, zipCode, country, phone, isDefault } = body;

  const updated = await prisma.address.update({
    where: { id },
    data: {
      ...(label !== undefined && { label }),
      ...(firstName !== undefined && { firstName }),
      ...(lastName !== undefined && { lastName }),
      ...(company !== undefined && { company }),
      ...(line1 !== undefined && { line1 }),
      ...(line2 !== undefined && { line2 }),
      ...(city !== undefined && { city }),
      ...(state !== undefined && { state }),
      ...(zipCode !== undefined && { zipCode }),
      ...(country !== undefined && { country }),
      ...(phone !== undefined && { phone }),
      ...(isDefault !== undefined && { isDefault }),
    },
  });

  return apiSuccess(updated);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) return apiError("UNAUTHORIZED", "Authentication required", 401);

  const { id } = await params;

  const existing = await prisma.address.findFirst({ where: { id, userId: session.user.id } });
  if (!existing) return apiError("NOT_FOUND", "Address not found", 404);

  await prisma.address.delete({ where: { id } });

  return apiSuccess({ deleted: true });
}
