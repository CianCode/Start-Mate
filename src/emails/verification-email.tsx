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

interface VerificationEmailProps {
  name: string;
  otp: string;
}

export const VerificationEmail = ({
  name = "User",
  otp = "123456",
}: VerificationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Verify your email address for Start Mate</Preview>
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Heading style={headingStyle}>Start Mate Email Verification</Heading>
          <Section style={sectionStyle}>
            <Text style={textStyle}>Hello {name},</Text>
            <Text style={textStyle}>
              Thank you for registering with Start Mate. Please use the
              verification code below to complete your registration:
            </Text>
            <Section style={codeContainerStyle}>
              <Text style={codeStyle}>{otp}</Text>
            </Section>
            <Text style={textStyle}>This code will expire in 10 minutes.</Text>
            <Hr style={hrStyle} />
            <Text style={footerStyle}>
              If you didn&#39;t request this code, please ignore this email.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Email styles
const bodyStyle = {
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  backgroundColor: "#f6f9fc",
  padding: "20px",
  margin: 0,
};

const containerStyle = {
  backgroundColor: "#ffffff",
  border: "1px solid #e0e0e0",
  borderRadius: "5px",
  padding: "20px",
  maxWidth: "600px",
  margin: "0 auto",
};

const headingStyle = {
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "30px 0",
  color: "#333",
};

const sectionStyle = {
  margin: "20px 0",
};

const textStyle = {
  fontSize: "16px",
  lineHeight: "24px",
  color: "#333",
  margin: "16px 0",
};

const codeContainerStyle = {
  margin: "30px auto",
  textAlign: "center" as const,
};

const codeStyle = {
  fontSize: "32px",
  fontWeight: "bold",
  color: "#4F46E5",
  letterSpacing: "4px",
  padding: "12px 24px",
  backgroundColor: "#F5F5F5",
  borderRadius: "4px",
  display: "inline-block",
};

const hrStyle = {
  borderColor: "#e0e0e0",
  margin: "30px 0",
};

const footerStyle = {
  fontSize: "14px",
  color: "#666",
  textAlign: "center" as const,
  fontStyle: "italic",
};

export default VerificationEmail;
