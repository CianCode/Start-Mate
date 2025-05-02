import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { emailOTP } from "better-auth/plugins";

import { db } from "@/db";
import * as schema from "@/db/schema";
import { EmailService, EmailType } from "@/lib/resend";

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
        try {
          // Map Better Auth type to our EmailService type
          let emailType: EmailType;

          switch (type) {
            case "sign-in":
              emailType = "signin";
              break;
            case "email-verification":
              emailType = "verification";
              break;
            case "forget-password":
              emailType = "reset-password";
              break;
            default:
              console.error(`Unsupported email type: ${type}`);
              return;
          }

          // Extract name from email (can be replaced with actual username lookup if needed)
          const name = email.split("@")[0];

          // Send the email using our email service
          const result = await EmailService.sendEmail(emailType, {
            to: email,
            name,
            otp,
          });

          if (!result.success) {
            console.error(result.error || `Failed to send email for ${type}`);
            return;
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
