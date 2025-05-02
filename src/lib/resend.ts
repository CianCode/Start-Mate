import { Resend } from "resend";

import { ResetPasswordEmail, VerificationEmail } from "@/emails";

// Email types for our service
export type EmailType = "verification" | "signin" | "reset-password";

// Unified interface for all email params
interface EmailParams {
  to: string;
  name?: string;
  otp: string;
}

// Initialize the Resend client
const resendApiKey = process.env.RESEND_API_KEY;

if (!resendApiKey) {
  console.warn(
    "RESEND_API_KEY is not defined in environment variables. Email sending will fail.",
  );
}

const resend = new Resend(resendApiKey);

// Get the sender email from environment variables or use a default
const fromEmail = process.env.RESEND_FROM_EMAIL || "auth@startmate.dev";
const emailSender = `Start Mate <${fromEmail}>`;

/**
 * EmailService - Handles email sending operations with proper logging and error handling
 */
export class EmailService {
  /**
   * Send an email based on the specified type
   */
  public static async sendEmail(
    type: EmailType,
    params: EmailParams,
  ): Promise<{ success: boolean; error?: string; messageId?: string }> {
    try {
      // Email component selection based on type
      let emailComponent;
      let subject = "";

      switch (type) {
        case "verification":
          emailComponent = VerificationEmail({
            name: params.name,
            otp: params.otp,
          });
          subject = "Verify your email address";
          break;
        case "signin":
          break;
        case "reset-password":
          emailComponent = ResetPasswordEmail({
            name: params.name,
            otp: params.otp,
          });
          subject = "Reset your password";
          break;
        default:
          console.error(`Unsupported email type: ${type}`);
      }

      // Send the email
      const { data, error } = await resend.emails.send({
        from: emailSender,
        to: [params.to],
        subject,
        react: emailComponent,
      });

      // Handle response
      if (error) {
        console.error(`Failed to send ${type} email to ${params.to}:`, error);
        return { success: false, error: error.message };
      }

      // Log success
      console.log(`Successfully sent ${type} email to ${params.to}`, {
        messageId: data?.id,
      });

      return { success: true, messageId: data?.id };
    } catch (error) {
      // Catch any unexpected errors
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error(`Error sending ${type} email to ${params.to}:`, error);
      return { success: false, error: errorMessage };
    }
  }
}
