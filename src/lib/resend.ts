import { Resend } from "resend";

// Initialize the Resend client
const resendApiKey = process.env.RESEND_API_KEY;

if (!resendApiKey) {
  console.error("RESEND_API_KEY is not defined in environment variables");
}

export const resend = new Resend(resendApiKey);
