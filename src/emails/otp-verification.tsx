// src/emails/otp-verification.tsx
import * as React from "react";

import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface OtpEmailProps {
  otp: string;
  username?: string;
  expiryMinutes?: number;
  otpType: "sign-in" | "email-verification" | "forgot-password";
}

export const OtpEmail = ({
  otp,
  username = "",
  expiryMinutes = 10,
  otpType = "email-verification",
}: OtpEmailProps) => {
  // Customize content based on OTP type
  const getSubjectLine = () => {
    switch (otpType) {
      case "sign-in":
        return "Your StartMate Sign-In Code";
      case "forgot-password":
        return "Your StartMate Password Reset Code";
      case "email-verification":
      default:
        return "Verify Your StartMate Account";
    }
  };

  const getHeading = () => {
    switch (otpType) {
      case "sign-in":
        return "Sign-In Code";
      case "forgot-password":
        return "Password Reset Code";
      case "email-verification":
      default:
        return "Verification Code";
    }
  };

  const getMessage = () => {
    switch (otpType) {
      case "sign-in":
        return "Please use the verification code below to sign in to your account:";
      case "forgot-password":
        return "Please use the verification code below to reset your password:";
      case "email-verification":
      default:
        return "Please use the verification code below to verify your email address:";
    }
  };

  const previewText = getSubjectLine();

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Logo Section */}
          <Section style={logo}>
            <Heading
              as="h1"
              style={{
                color: "#0f172a",
                fontSize: "32px",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              StartMate
            </Heading>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Heading as="h2" style={heading}>
              {getHeading()}
            </Heading>

            <Text style={paragraph}>
              {username ? `Hi ${username},` : "Hello,"}
            </Text>

            <Text style={paragraph}>{getMessage()}</Text>

            <Section style={otpContainer}>
              <Text style={otpCode}>{otp}</Text>
            </Section>

            <Text style={paragraph}>
              This code will expire in {expiryMinutes} minutes. If you didn't
              request this code, you can safely ignore this email.
            </Text>
          </Section>

          <Hr style={hr} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              © {new Date().getFullYear()} StartMate. All rights reserved.
            </Text>

            <Text style={footerText}>
              This is an automated message, please do not reply.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const main = {
  backgroundColor: "#f9fafb",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "24px",
  maxWidth: "600px",
};

const logo = {
  marginTop: "24px",
};

const content = {
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  padding: "32px",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
};

const heading = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "#111827",
  paddingBottom: "8px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "1.5",
  color: "#4b5563",
  margin: "16px 0",
};

const otpContainer = {
  margin: "24px 0",
  padding: "16px",
  backgroundColor: "#f3f4f6",
  borderRadius: "6px",
  textAlign: "center" as const,
};

const otpCode = {
  fontSize: "32px",
  fontWeight: "bold",
  color: "#1f2937",
  letterSpacing: "8px",
  fontFamily: "monospace",
};

const hr = {
  margin: "24px 0",
  borderColor: "#e5e7eb",
  borderWidth: "1px",
};

const footer = {
  padding: "16px 0",
};

const footerText = {
  fontSize: "14px",
  lineHeight: "1.5",
  color: "#6b7280",
  margin: "8px 0",
  textAlign: "center" as const,
};

export default OtpEmail;
