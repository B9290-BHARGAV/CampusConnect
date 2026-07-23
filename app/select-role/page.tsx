"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SelectRolePage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function chooseRole(role: "student" | "faculty") {
    if (!session?.user?.email) return;

    setLoading(true);

    const res = await fetch("/api/auth/set-role", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: session.user.email,
        role,
      }),
    });

    if (!res.ok) {
      alert("Unable to save role.");
      setLoading(false);
      return;
    }

    router.push(role === "student" ? "/student" : "/faculty");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-lg">

        <h1 className="text-4xl font-bold text-center">
          Choose Your Role
        </h1>

        <p className="text-center text-gray-500 mt-3">
          Select how you want to use CampusConnect.
        </p>

        <div className="mt-10 space-y-5">

          <button
            onClick={() => chooseRole("student")}
            disabled={loading}
            className="w-full rounded-xl bg-indigo-600 py-4 text-white text-lg font-semibold"
          >
            🎓 Student
          </button>

          <button
            onClick={() => chooseRole("faculty")}
            disabled={loading}
            className="w-full rounded-xl bg-gray-900 py-4 text-white text-lg font-semibold"
          >
            👨‍🏫 Faculty
          </button>

        </div>
      </div>
    </main>
  );
}