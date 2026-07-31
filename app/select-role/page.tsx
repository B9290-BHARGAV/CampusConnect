"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { GraduationCap, UserCog } from "lucide-react";

export default function SelectRolePage() {
  const { data: session, update, status } = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function chooseRole(role: "student" | "faculty") {
    setLoading(true);

    // Case 1: User just signed up via email/password (not yet logged in)
    // We stored their email in localStorage after signup
    const pendingEmail = localStorage.getItem("pendingRoleEmail");

    if (!session?.user?.email && pendingEmail) {
      const res = await fetch("/api/auth/set-role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: pendingEmail, role }),
      });

      if (!res.ok) {
        alert("Unable to save role.");
        setLoading(false);
        return;
      }

      localStorage.removeItem("pendingRoleEmail");

      // Now send them to login to sign in with their new credentials
      router.push("/login");
      return;
    }

    // Case 2: User is logged in via Google (new Google user with no role)
    if (session?.user?.email) {
      const res = await fetch("/api/auth/set-role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: session.user.email, role }),
      });

      if (!res.ok) {
        alert("Unable to save role.");
        setLoading(false);
        return;
      }

      // Refresh the JWT so the new role is included in the session token
      await update({ role });

      router.push(role === "student" ? "/student" : "/faculty");
      return;
    }

    // Fallback — not logged in and no pending email
    router.push("/login");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-purple-100 p-6">
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-10 w-full max-w-lg">

        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold">Choose Your Role 🎓</h1>
          <p className="text-gray-500 mt-3">
            Select how you want to use CampusConnect.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <button
            onClick={() => chooseRole("student")}
            disabled={loading}
            className="rounded-2xl border-2 border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 p-8 transition-all disabled:opacity-50"
          >
            <GraduationCap className="mx-auto mb-3 h-12 w-12 text-indigo-600" />
            <h3 className="font-semibold text-lg">Student</h3>
          </button>

          <button
            onClick={() => chooseRole("faculty")}
            disabled={loading}
            className="rounded-2xl border-2 border-gray-200 hover:border-gray-900 hover:bg-gray-50 p-8 transition-all disabled:opacity-50"
          >
            <UserCog className="mx-auto mb-3 h-12 w-12 text-gray-800" />
            <h3 className="font-semibold text-lg">Faculty</h3>
          </button>
        </div>

        {loading && (
          <p className="text-center text-sm text-gray-400">Saving your role...</p>
        )}
      </div>
    </main>
  );
}