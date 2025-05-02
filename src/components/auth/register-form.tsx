"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { registerSchema } from "@/validations";

const otpSchema = z.object({
  pin: z.string().min(6, "Verification code must be 6 digits."),
});

type RegisterFormData = z.infer<typeof registerSchema>;
type OtpFormData = z.infer<typeof otpSchema>;

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });
  const otpForm = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: { pin: "" },
  });

  const handleRegisterSubmit = async (data: RegisterFormData) => {
    setSubmitError("");
    await authClient.signUp.email(
      {
        email: data.email,
        password: data.password,
        name: `${data.first_name} ${data.last_name}`,
      },
      {
        onRequest: () => setIsSubmitting(true),
        onSuccess: async () => {
          try {
            await authClient.emailOtp.sendVerificationOtp({
              email: data.email,
              type: "email-verification",
            });
            setUserEmail(data.email);
            setSubmitSuccess("Check your email for a verification code.");
            setShowVerification(true);
          } catch {
            setSubmitError("Failed to send verification email.");
          } finally {
            setIsSubmitting(false);
          }
        },
        onError: (ctx) => {
          setSubmitError(ctx.error.message || "Registration failed.");
          setIsSubmitting(false);
        },
      },
    );
  };

  const handleOtpSubmit = async (data: OtpFormData) => {
    setSubmitError("");
    setIsSubmitting(true);

    await authClient.emailOtp.verifyEmail(
      { email: userEmail, otp: data.pin },
      {
        onSuccess: () => {
          setSubmitSuccess("Email verified! Redirecting...");
          setTimeout(() => router.push("/"), 2000);
        },
        onError: (ctx) => {
          otpForm.reset({ pin: "" });
          setSubmitError(ctx.error.message || "Invalid code. Try again.");
          setSubmitSuccess("");
          setIsSubmitting(false);
        },
        onFinally: () => setIsSubmitting(false),
      },
    );
  };

  const resendOtp = async () => {
    if (!userEmail) return;
    setSubmitError("");
    setSubmitSuccess("");
    setIsSubmitting(true);

    try {
      await authClient.emailOtp.sendVerificationOtp(
        { email: userEmail, type: "email-verification" },
        {
          onSuccess: () => {
            setSubmitSuccess("Verification code resent to your email.");
            setIsSubmitting(false);
          },
          onError: (ctx) =>
            setSubmitError(ctx.error.message || "Failed to resend code."),
          onFinally: () => setIsSubmitting(false),
        },
      );
    } catch (error: any) {
      setSubmitError(error?.message || "Something went wrong.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">
            {showVerification ? "Verify Your Email" : "Welcome!"}
          </CardTitle>
          <CardDescription>
            {showVerification
              ? `Enter the code sent to ${userEmail}`
              : "Create your account to get started"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!showVerification ? (
            <form
              onSubmit={registerForm.handleSubmit(handleRegisterSubmit)}
              className="grid gap-6"
            >
              <div className="flex gap-4">
                <div className="w-full">
                  <Label htmlFor="first_name">First Name</Label>
                  <Input
                    {...registerForm.register("first_name")}
                    id="first_name"
                    placeholder="John"
                  />
                  {registerForm.formState.errors.first_name && (
                    <FormMessage>
                      {registerForm.formState.errors.first_name.message}
                    </FormMessage>
                  )}
                </div>
                <div className="w-full">
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input
                    {...registerForm.register("last_name")}
                    id="last_name"
                    placeholder="Doe"
                  />
                  {registerForm.formState.errors.last_name && (
                    <FormMessage>
                      {registerForm.formState.errors.last_name.message}
                    </FormMessage>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  {...registerForm.register("email")}
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                />
                {registerForm.formState.errors.email && (
                  <FormMessage>
                    {registerForm.formState.errors.email.message}
                  </FormMessage>
                )}
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  {...registerForm.register("password")}
                  id="password"
                  type="password"
                />
                {registerForm.formState.errors.password && (
                  <FormMessage>
                    {registerForm.formState.errors.password.message}
                  </FormMessage>
                )}
              </div>

              <div>
                <Label htmlFor="confirm_password">Confirm Password</Label>
                <Input
                  {...registerForm.register("confirm_password")}
                  id="confirm_password"
                  type="password"
                />
                {registerForm.formState.errors.confirm_password && (
                  <FormMessage>
                    {registerForm.formState.errors.confirm_password.message}
                  </FormMessage>
                )}
              </div>

              {submitError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{submitError}</AlertDescription>
                </Alert>
              )}
              {submitSuccess && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Success</AlertTitle>
                  <AlertDescription>{submitSuccess}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                    Registering...
                  </>
                ) : (
                  "Register"
                )}
              </Button>

              <div className="text-center text-sm">
                Already have an account?{" "}
                <a href="/login" className="underline">
                  Log in
                </a>
              </div>
            </form>
          ) : (
            <Form {...otpForm}>
              <form
                onSubmit={otpForm.handleSubmit(handleOtpSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={otpForm.control}
                  name="pin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Verification Code</FormLabel>
                      <FormControl>
                        <div className="flex justify-center gap-2">
                          <InputOTP maxLength={6} {...field}>
                            <InputOTPGroup>
                              {[...Array(6)].map((_, i) => (
                                <React.Fragment key={i}>
                                  <InputOTPSlot index={i} />
                                  {i === 2 && <InputOTPSeparator />}
                                </React.Fragment>
                              ))}
                            </InputOTPGroup>
                          </InputOTP>
                        </div>
                      </FormControl>
                      <FormDescription>
                        Enter the 6-digit code we sent to your email.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {submitError && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{submitError}</AlertDescription>
                  </Alert>
                )}
                {submitSuccess && (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Success</AlertTitle>
                    <AlertDescription>{submitSuccess}</AlertDescription>
                  </Alert>
                )}

                <div className="flex flex-col gap-3">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                        Verifying...
                      </>
                    ) : (
                      "Verify Email"
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={resendOtp}
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    Resend Code
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>

      <p className="text-muted-foreground text-center text-xs">
        By continuing, you agree to our{" "}
        <a href="#" className="underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="underline">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
}
