import * as React from "react";

import {
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

import {
  EmailLayout,
  codeContainerStyle,
  codeStyle,
  textStyle,
} from "./shared";

interface VerificationEmailProps {
  name?: string;
  otp: string;
}

export const VerificationEmail = ({
  name = "User",
  otp,
}: VerificationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Verify your email address for Start Mate</Preview>
      <EmailLayout>
        <Heading
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            textAlign: "center",
            margin: "30px 0",
            color: "#333",
          }}
        >
          Email Verification
        </Heading>

        <Section>
          <Text style={textStyle}>Hello {name},</Text>
          <Text style={textStyle}>
            Thank you for registering with Start Mate. Please use the
            verification code below to complete your registration:
          </Text>

          <Section style={codeContainerStyle}>
            <Text style={codeStyle}>{otp}</Text>
          </Section>

          <Text style={textStyle}>This code will expire in 10 minutes.</Text>
          <Hr style={{ borderColor: "#e0e0e0", margin: "30px 0" }} />

          <Text
            style={{
              fontSize: "14px",
              color: "#666",
              textAlign: "center",
              fontStyle: "italic",
            }}
          >
            If you didn&#39;t request this code, please ignore this email.
          </Text>
        </Section>
      </EmailLayout>
    </Html>
  );
};

export default VerificationEmail;
