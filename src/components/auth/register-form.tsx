"use client";

import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { RegisterFormData } from "@/types";
import { registerSchema } from "@/validations";

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    await authClient.signUp.email(
      {
        email: data.email,
        password: data.password,
        name: `${data.first_name} ${data.last_name}`,
      },
      {
        onRequest: () => {
          //show loading
          setIsSubmitting(true);
        },
        onSuccess: () => {
          setIsSubmitting(false);
          reset();
        },
        onError: (ctx) => {
          setSubmitError(ctx.error.message);
          setIsSubmitting(false);
        },
      },
    );
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome !</CardTitle>
          <CardDescription>Create your account to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="flex gap-6">
                  <div>
                    <Label htmlFor="firt_name">First Name</Label>
                    <Input
                      {...register("first_name")}
                      id="firt_name"
                      type="firt_name"
                      placeholder="John"
                      className="mt-2"
                    />
                    {errors.first_name && (
                      <p className="text-destructive mt-1 text-sm">
                        {errors.first_name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="last_name">Last Name</Label>
                    <Input
                      {...register("last_name")}
                      id="last_name"
                      type="last_name"
                      placeholder="Doe"
                      className="mt-2"
                    />
                    {errors.last_name && (
                      <p className="text-destructive mt-1 text-sm">
                        {errors.last_name.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...register("email")}
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                  />
                  {errors.email && (
                    <p className="text-destructive mt-1 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    {...register("password")}
                    id="password"
                    type="password"
                  />
                  {errors.password && (
                    <p className="text-destructive mt-1 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirm_password">Confirm Password</Label>
                  <Input
                    {...register("confirm_password")}
                    id="confirm_password"
                    type="password"
                  />
                  {errors.confirm_password && (
                    <p className="text-destructive mt-1 text-sm">
                      {errors.confirm_password.message}
                    </p>
                  )}
                </div>
                {submitError && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{submitError}</AlertDescription>
                  </Alert>
                )}
                <Button type="submit" className="w-full">
                  {isSubmitting ? (
                    <>
                      Loading
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    </>
                  ) : (
                    <>
                      <span>Register</span>
                    </>
                  )}
                </Button>
              </div>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <a href="/login" className="underline underline-offset-4">
                  Log in
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground [&_a]:hover:text-primary text-center text-xs text-balance [&_a]:underline [&_a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
