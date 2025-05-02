import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { emailOTP } from "better-auth/plugins";

import { db } from "@/db";
import * as schema from "@/db/schema";
import VerificationEmail from "@/emails/verification-email";
import { resend } from "@/lib/resend";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "pg" or "mysql"
    schema: schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        const fromEmail = process.env.RESEND_FROM_EMAIL || "auth@startmate.dev";

        try {
          if (type === "sign-in") {
            await resend.emails.send({
              from: `Start Mate <${fromEmail}>`,
              to: [email],
              subject: "Sign-in verification code",
              react: VerificationEmail({
                name: email,
                otp,
              }),
            });
          } else if (type === "email-verification") {
            await resend.emails.send({
              from: `Start Mate <${fromEmail}>`,
              to: [email],
              subject: "Verify your email address",
              react: VerificationEmail({
                name: email,
                otp,
              }),
            });
          } else if (type === "forget-password") {
            await resend.emails.send({
              from: `Start Mate <${fromEmail}>`,
              to: [email],
              subject: "Reset your password",
              react: VerificationEmail({
                name: email,
                otp,
              }),
            });
          }

          console.log(`Email sent successfully to ${email} for ${type}`);
        } catch (error) {
          console.error(`Failed to send email to ${email}:`, error);
          throw new Error(`Failed to send email for ${type}`);
        }
      },
    }),
  ],
});
