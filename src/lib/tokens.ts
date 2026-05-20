import crypto from "crypto";
import { prisma } from "./prisma";

export function generateToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export async function createVerificationToken(userId: string): Promise<string> {
  const token = generateToken();
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

  await prisma.verificationToken.create({
    data: {
      identifier: userId,
      token,
      expires,
    },
  });

  return token;
}

export async function createPasswordResetToken(email: string): Promise<string | null> {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return null;

  const token = generateToken();
  const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  await prisma.verificationToken.create({
    data: {
      identifier: `reset:${user.id}`,
      token,
      expires,
    },
  });

  return token;
}

export async function verifyToken(token: string): Promise<string | null> {
  const record = await prisma.verificationToken.findUnique({
    where: { token },
  });

  if (!record) return null;
  if (record.expires < new Date()) {
    await prisma.verificationToken.delete({ where: { token } });
    return null;
  }

  // Delete used token
  await prisma.verificationToken.delete({ where: { token } });

  return record.identifier;
}
