import { headers } from "next/headers";

import Signout from "@/components/auth/signout";
import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      {session ? (
        <>
          <div>Welcome back, {session.user.name}</div>
          <Signout />
        </>
      ) : (
        <div>Please log in or register</div>
      )}
    </div>
  );
}
