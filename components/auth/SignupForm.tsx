"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignupForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
      alert("Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
          role,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("🎉 Account created successfully!");

      router.push("/login");
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-lg rounded-3xl border border-white/20 bg-white/80 shadow-2xl backdrop-blur-xl">
      <CardContent className="space-y-6 p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Create Account 🚀</h1>

          <p className="mt-2 text-gray-500">
            Join CampusConnect today
          </p>
        </div>

        <div className="space-y-2">
          <Label>Full Name</Label>

          <Input
            placeholder="Bhargav Patel"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

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
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Confirm Password</Label>

          <div className="relative">
            <Input
              type={showConfirm ? "text" : "password"}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <Label>Select Role</Label>

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setRole("student")}
              className={`rounded-xl border p-4 transition ${
                role === "student"
                  ? "border-indigo-600 bg-indigo-50"
                  : "hover:border-indigo-300"
              }`}
            >
              🎓 Student
            </button>

            <button
              type="button"
              onClick={() => setRole("faculty")}
              className={`rounded-xl border p-4 transition ${
                role === "faculty"
                  ? "border-indigo-600 bg-indigo-50"
                  : "hover:border-indigo-300"
              }`}
            >
              👨‍🏫 Faculty
            </button>
          </div>
        </div>

        <Button
          className="h-11 w-full rounded-xl"
          onClick={handleSignup}
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </Button>

        <p className="text-center text-sm text-gray-500">
          Already have an account?

          <Link
            href="/login"
            className="ml-2 font-semibold text-indigo-600"
          >
            Login
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}