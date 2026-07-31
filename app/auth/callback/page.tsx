"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AuthCallbackPage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      router.replace("/login");
      return;
    }

    if (!session?.user) return;

    const role = session.user.role;
    const email = session.user.email;

    async function redirect() {
      if (!role) {
        // Force the JWT to re-read from DB (role may have just been saved during signup)
        const refreshed = await update();
        const freshRole = refreshed?.user?.role;

        if (!freshRole) {
          // Still no role — new Google user needs to complete signup
          router.replace(`/signup?email=${encodeURIComponent(email ?? "")}`);
        } else if (freshRole === "student") {
          router.replace("/student");
        } else if (freshRole === "faculty") {
          router.replace("/faculty");
        }
        return;
      }

      if (role === "student") {
        router.replace("/student");
      } else if (role === "faculty") {
        router.replace("/faculty");
      }
    }

    redirect();
  }, [session, status, router, update]);

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Redirecting...</h2>
        <p className="mt-3 text-gray-500">
          Please wait while we prepare your dashboard.
        </p>
      </div>
    </main>
  );
}