"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        setLoading(false);
        return;
      }

      // ✅ Save logged in user
      localStorage.setItem(
        "campusUser",
        JSON.stringify(data.user)
      );

      alert("🎉 Login Successful!");

      if (data.user.role === "student") {
        router.push("/student");
      } else {
        router.push("/faculty");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }

    setLoading(false);
  }

  return (
    <Card className="w-full max-w-lg rounded-3xl border border-white/20 bg-white/80 shadow-2xl backdrop-blur-xl">
      <CardContent className="space-y-6 p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold">
            Welcome Back 👋
          </h1>

          <p className="mt-2 text-gray-500">
            Login to continue to CampusConnect
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">

          <div className="space-y-2">
            <Label>Email</Label>

            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Password</Label>

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="h-11 w-full rounded-xl"
          >
            {loading ? "Logging In..." : "Login"}
          </Button>

        </form>

        <p className="text-center text-sm text-gray-500">
          Don't have an account?

          <Link
            href="/signup"
            className="ml-2 font-semibold text-indigo-600"
          >
            Sign Up
          </Link>
        </p>

      </CardContent>
    </Card>
  );
}