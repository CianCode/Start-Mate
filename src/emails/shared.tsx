import * as React from "react";

import { Body, Container } from "@react-email/components";

interface EmailLayoutProps {
  children: React.ReactNode;
}

export const EmailLayout: React.FC<EmailLayoutProps> = ({ children }) => {
  return (
    <Body style={bodyStyle}>
      <Container style={containerStyle}>{children}</Container>
    </Body>
  );
};

// Shared email styles
export const bodyStyle = {
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  backgroundColor: "#f6f9fc",
  padding: "20px",
  margin: 0,
};

export const containerStyle = {
  backgroundColor: "#ffffff",
  border: "1px solid #e0e0e0",
  borderRadius: "5px",
  padding: "20px",
  maxWidth: "600px",
  margin: "0 auto",
};

export const textStyle = {
  fontSize: "16px",
  lineHeight: "24px",
  color: "#333",
  margin: "16px 0",
};

export const codeContainerStyle = {
  margin: "30px auto",
  textAlign: "center" as const,
};

export const codeStyle = {
  fontSize: "32px",
  fontWeight: "bold",
  color: "#4F46E5",
  letterSpacing: "4px",
  padding: "12px 24px",
  backgroundColor: "#F5F5F5",
  borderRadius: "4px",
  display: "inline-block",
};
