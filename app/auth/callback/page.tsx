"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AuthCallbackPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      router.replace("/login");
      return;
    }

    if (!session?.user) return;

    const role = session.user.role;

    if (!role) {
      router.replace("/select-role");
      return;
    }

    if (role === "student") {
      router.replace("/student");
      return;
    }

    if (role === "faculty") {
      router.replace("/faculty");
      return;
    }
  }, [session, status, router]);

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-3xl font-bold">
          Redirecting...
        </h2>

        <p className="mt-3 text-gray-500">
          Please wait while we prepare your dashboard.
        </p>
      </div>
    </main>
  );
}