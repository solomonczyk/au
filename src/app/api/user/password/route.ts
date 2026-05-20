import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ChangePasswordSchema } from "@/lib/validations/user";
import bcrypt from "bcryptjs";

export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json(
      { success: false, error: { code: "UNAUTHORIZED", message: "Authentication required" } },
      { status: 401 }
    );
  }

  const body = await req.json();
  const validated = ChangePasswordSchema.safeParse(body);
  if (!validated.success) {
    return NextResponse.json(
      { success: false, error: { code: "VALIDATION_ERROR", message: validated.error.issues[0].message } },
      { status: 400 }
    );
  }

  const { currentPassword, newPassword } = validated.data;

  const dbUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { passwordHash: true },
  });

  if (!dbUser?.passwordHash) {
    return NextResponse.json(
      { success: false, error: { code: "NO_PASSWORD", message: "Account uses OAuth login" } },
      { status: 400 }
    );
  }

  const isValid = await bcrypt.compare(currentPassword, dbUser.passwordHash);
  if (!isValid) {
    return NextResponse.json(
      { success: false, error: { code: "INVALID_PASSWORD", message: "Current password is incorrect" } },
      { status: 400 }
    );
  }

  const newHash = await bcrypt.hash(newPassword, 12);
  await prisma.user.update({
    where: { id: session.user.id },
    data: { passwordHash: newHash },
  });

  return NextResponse.json({ success: true, data: { message: "Password updated" } });
}
