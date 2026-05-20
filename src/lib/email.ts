import { env } from "./env";

type SendEmailParams = {
  to: string;
  subject: string;
  html: string;
};

export async function sendEmail({ to, subject, html }: SendEmailParams) {
  if (!env.RESEND_API_KEY) {
    console.log(`[EMAIL DEBUG] To: ${to}, Subject: ${subject}`);
    return { id: "debug" };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: env.EMAIL_FROM,
      to,
      subject,
      html,
    }),
  });

  if (!res.ok) {
    console.error("Failed to send email:", await res.text());
  }

  return res.json();
}

export function sendVerificationEmail(email: string, token: string) {
  const url = `${env.NEXT_PUBLIC_SITE_URL}/auth/verify-email?token=${token}`;
  return sendEmail({
    to: email,
    subject: "Verify your email — AUREUM GOLD",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h1 style="color: #f2ca50;">AUREUM GOLD</h1>
        <p>Thank you for creating an account. Please verify your email address by clicking the link below:</p>
        <a href="${url}" style="display: inline-block; background: #f2ca50; color: #3c2f00; padding: 12px 32px; text-decoration: none; font-weight: 600;">
          Verify Email
        </a>
        <p style="margin-top: 24px; font-size: 14px; color: #666;">
          This link expires in 24 hours. If you did not create an account, please ignore this email.
        </p>
      </div>
    `,
  });
}

export function sendPasswordResetEmail(email: string, token: string) {
  const url = `${env.NEXT_PUBLIC_SITE_URL}/auth/reset-password?token=${token}`;
  return sendEmail({
    to: email,
    subject: "Reset your password — AUREUM GOLD",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h1 style="color: #f2ca50;">AUREUM GOLD</h1>
        <p>You requested a password reset. Click the link below to set a new password:</p>
        <a href="${url}" style="display: inline-block; background: #f2ca50; color: #3c2f00; padding: 12px 32px; text-decoration: none; font-weight: 600;">
          Reset Password
        </a>
        <p style="margin-top: 24px; font-size: 14px; color: #666;">
          This link expires in 1 hour. If you did not request a reset, please ignore this email.
        </p>
      </div>
    `,
  });
}

export function sendOrderConfirmationEmail(email: string, orderNumber: string) {
  return sendEmail({
    to: email,
    subject: `Order Confirmed — ${orderNumber} — AUREUM GOLD`,
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h1 style="color: #f2ca50;">AUREUM GOLD</h1>
        <p>Your order <strong>${orderNumber}</strong> has been confirmed and is being processed.</p>
        <p style="font-size: 14px; color: #666;">
          You will receive a shipping confirmation with tracking information once your order ships.
        </p>
      </div>
    `,
  });
}
