import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { fullName, email, password, role, enrollmentNumber, department } = body;

    if (!fullName || !email) {
      return NextResponse.json(
        { message: "Name and email are required" },
        { status: 400 }
      );
    }

    if (!role || !["student", "faculty"].includes(role)) {
      return NextResponse.json(
        { message: "Please select a valid role" },
        { status: 400 }
      );
    }

    // Auto-promote to admin if the email matches any in the ADMIN_EMAIL list (comma-separated)
    const adminEmails = (process.env.ADMIN_EMAIL || "")
      .split(",")
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean);
    const finalRole = adminEmails.includes(email.toLowerCase()) ? "admin" : role;

    // For Google users no password is sent — auto-generate a secure random one
    const rawPassword = password ?? crypto.randomBytes(32).toString("hex");
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // Google user completing their profile (name + role + auto-password)
      if (existingUser.provider === "google") {
        existingUser.fullName = fullName;
        existingUser.password = hashedPassword;
        existingUser.role = finalRole;
        if (enrollmentNumber) existingUser.enrollmentNumber = enrollmentNumber;
        if (department) existingUser.department = department;
        await existingUser.save();

        return NextResponse.json(
          { message: "Profile completed successfully", user: existingUser },
          { status: 200 }
        );
      }

      // True duplicate email
      return NextResponse.json(
        { message: "An account with this email already exists" },
        { status: 400 }
      );
    }

    // Brand new user (not from Google)
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      role: finalRole,
      enrollmentNumber: enrollmentNumber ?? "",
      department: department ?? "",
      provider: "credentials",
    });

    return NextResponse.json(
      { message: "Account created successfully", user },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Signup Error:", error);

    return NextResponse.json(
      { message: error.message, error: String(error) },
      { status: 500 }
    );
  }
}