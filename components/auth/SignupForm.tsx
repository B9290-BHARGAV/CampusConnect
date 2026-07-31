"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { GraduationCap, UserCog } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // If coming from Google OAuth, email is passed as a query param
  const googleEmail = searchParams.get("email") ?? "";
  const isFromGoogle = !!googleEmail;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState(googleEmail);
  const [role, setRole] = useState<"student" | "faculty" | null>(null);
  const [enrollmentNumber, setEnrollmentNumber] = useState("");
  const [department, setDepartment] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (googleEmail) setEmail(googleEmail);
  }, [googleEmail]);

  const handleSignup = async () => {
    if (!fullName || !email) {
      alert("Please fill all fields.");
      return;
    }

    if (!role) {
      alert("Please select a role.");
      return;
    }

    // Only validate password for non-Google signups
    if (!isFromGoogle) {
      if (!password || !confirmPassword) {
        alert("Please fill all fields.");
        return;
      }
      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }
    }

    try {
      setLoading(true);

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          role,
          enrollmentNumber,
          department,
          // For Google users, no password is sent — backend auto-generates one
          ...(isFromGoogle ? {} : { password }),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      // Google users are already authenticated — go straight to dashboard
      if (isFromGoogle) {
        router.push("/auth/callback");
      } else {
        localStorage.setItem("pendingRoleEmail", email);
        router.push("/select-role");
      }
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
          <h1 className="text-3xl font-bold">
            {isFromGoogle ? "Complete Your Profile 🚀" : "Create Account 🚀"}
          </h1>
          <p className="mt-2 text-gray-500">
            {isFromGoogle
              ? "Just one more step to get started."
              : "Join CampusConnect today"}
          </p>
        </div>

        {/* Full Name */}
        <div className="space-y-2">
          <Label>Full Name</Label>
          <Input
            placeholder="Bhargav Patel"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        {/* Email — pre-filled and locked if coming from Google */}
        <div className="space-y-2">
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => !isFromGoogle && setEmail(e.target.value)}
            readOnly={isFromGoogle}
            className={
              isFromGoogle ? "bg-gray-100 cursor-not-allowed text-gray-500" : ""
            }
          />
          {isFromGoogle && (
            <p className="text-xs text-indigo-500">✓ Verified via Google</p>
          )}
        </div>

        {/* Enrollment Number */}
        <div className="space-y-2">
          <Label>
            Enrollment Number
            {role === "faculty" && (
              <span className="ml-2 text-xs font-normal text-gray-400">(optional)</span>
            )}
          </Label>
          <Input
            placeholder="e.g. 23DCE077"
            value={enrollmentNumber}
            onChange={(e) => setEnrollmentNumber(e.target.value)}
          />
        </div>

        {/* Branch / Department */}
        <div className="space-y-2">
          <Label>Branch / Department</Label>
          <Input
            placeholder="e.g. Computer Engineering"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
        </div>

        {/* Role Selection */}
        <div className="space-y-3">
          <Label>Select Role</Label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setRole("student")}
              className={`rounded-xl border-2 p-5 transition-all ${
                role === "student"
                  ? "border-indigo-600 bg-indigo-50"
                  : "border-gray-200 hover:border-indigo-300"
              }`}
            >
              <GraduationCap className="mx-auto mb-2 h-8 w-8 text-indigo-600" />
              <p className="font-semibold">Student</p>
            </button>

            <button
              type="button"
              onClick={() => setRole("faculty")}
              className={`rounded-xl border-2 p-5 transition-all ${
                role === "faculty"
                  ? "border-gray-900 bg-gray-50"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <UserCog className="mx-auto mb-2 h-8 w-8 text-gray-800" />
              <p className="font-semibold">Faculty</p>
            </button>
          </div>
        </div>

        {/* Password fields — only shown for non-Google signups */}
        {!isFromGoogle && (
          <>
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
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
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
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </>
        )}

        <Button
          className="h-11 w-full rounded-xl"
          onClick={handleSignup}
          disabled={loading}
        >
          {loading ? "Saving..." : "Continue →"}
        </Button>

        {!isFromGoogle && (
          <p className="text-center text-sm text-gray-500">
            Already have an account?
            <Link href="/login" className="ml-2 font-semibold text-indigo-600">
              Login
            </Link>
          </p>
        )}
      </CardContent>
    </Card>
  );
}