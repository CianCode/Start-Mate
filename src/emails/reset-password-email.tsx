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

interface ResetPasswordEmailProps {
  name?: string;
  otp: string;
}

export const ResetPasswordEmail = ({
  name = "User",
  otp,
}: ResetPasswordEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Reset Your Start Mate Password</Preview>
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
          Password Reset
        </Heading>

        <Section>
          <Text style={textStyle}>Hello {name},</Text>
          <Text style={textStyle}>
            We received a request to reset your password for Start Mate. Please
            use the code below to reset your password:
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
            If you didn&#39;t request a password reset, please ignore this email
            or contact support if you&#39;re concerned about your account&#39;s
            security.
          </Text>
        </Section>
      </EmailLayout>
    </Html>
  );
};

export default ResetPasswordEmail;
