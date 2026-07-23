"use client";

import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function LoginForm() {
  return (
    <Card className="w-full max-w-lg rounded-3xl border border-white/20 bg-white/80 shadow-2xl backdrop-blur-xl">
      <CardContent className="space-y-8 p-8">

        <div className="text-center">
          <h1 className="text-4xl font-bold">
            Welcome to CampusConnect 👋
          </h1>

          <p className="mt-3 text-gray-500">
            Sign in using your verified Google account.
          </p>
        </div>

        <Button
          className="h-12 w-full rounded-xl"
          onClick={() =>
            signIn("google", {
              callbackUrl: "/auth/callback",
            })
          }
        >
          Continue with Google
        </Button>

      </CardContent>
    </Card>
  );
}