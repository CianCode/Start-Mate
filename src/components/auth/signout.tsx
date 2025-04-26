"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { Loader2, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function Signout() {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);
  return (
    <Button
      variant="outline"
      className="gap-2"
      disabled={isSigningOut}
      onClick={async () => {
        setIsSigningOut(true);
        await authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              router.push("/login"); // redirect to login page
            },
          },
        });
        setIsSigningOut(false);
      }}
    >
      {isSigningOut ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        <>
          <LogOut size={16} />
          Sign Out
        </>
      )}
    </Button>
  );
}
