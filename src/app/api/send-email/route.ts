import { NextRequest, NextResponse } from "next/server";

import { z } from "zod";

import { EmailService, EmailType } from "@/lib/resend";

// Validate email request schema
const emailSchema = z.object({
  type: z.enum(["verification", "signin", "reset-password"]),
  to: z.string().email(),
  name: z.string().optional(),
  otp: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validatedData = emailSchema.parse(body);

    const { type, to, name, otp } = validatedData;

    // Send email using our service
    const result = await EmailService.sendEmail(type as EmailType, {
      to,
      name,
      otp,
    });

    // Handle response
    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to send email" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        messageId: result.messageId,
      },
      { status: 200 },
    );
  } catch (error) {
    // Handle validation errors specifically
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.errors },
        { status: 400 },
      );
    }

    // Handle other errors
    console.error("Email sending error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Failed to send email";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
