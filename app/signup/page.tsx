import { Suspense } from "react";
import SignupForm from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-purple-100 p-6">
      <Suspense fallback={<div className="text-gray-400">Loading...</div>}>
        <SignupForm />
      </Suspense>
    </main>
  );
}