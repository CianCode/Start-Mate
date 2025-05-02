import { NextRequest, NextResponse } from "next/server";

import { z } from "zod";

import VerificationEmail from "@/emails/verification-email";
import { resend } from "@/lib/resend";

const emailSchema = z.object({
  type: z.enum(["verification"]),
  to: z.string().email(),
  name: z.string(),
  otp: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = emailSchema.parse(body);

    const { type, to, name, otp } = validatedData;

    const fromEmail = process.env.RESEND_FROM_EMAIL || "auth@yourdomain.com";

    let data;

    if (type === "verification") {
      if (!otp) {
        return NextResponse.json(
          { error: "OTP is required for verification emails" },
          { status: 400 },
        );
      }

      const { data: emailData, error } = await resend.emails.send({
        from: `Start Mate <${fromEmail}>`,
        to: [to],
        subject: "Verify your email address",
        react: VerificationEmail({ name, otp }),
      });

      data = emailData;

      if (error) {
        return NextResponse.json({ error }, { status: 400 });
      }
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}
