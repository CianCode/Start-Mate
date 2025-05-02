import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { emailOTP } from "better-auth/plugins";

import { db } from "@/db";
import * as schema from "@/db/schema";

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
        if (type === "sign-in") {
          console.log(`Email: ${email}, sign-in OTP: ${otp}`);
        } else if (type === "email-verification") {
          console.log(`Email: ${email}, verification OTP: ${otp}`);
        } else {
          console.log(`Email: ${email}, forgot password OTP: ${otp}`);
        }
      },
    }),
  ],
});
