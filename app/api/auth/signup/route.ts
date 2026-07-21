import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const { fullName, email, password, role } = body;

    if (!fullName || !email || !password || !role) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      role,
    });

    return NextResponse.json(
      {
        message: "Account Created Successfully",
        user,
      },
      { status: 201 }
    );
  } catch (error: any) 
  {
  console.error("Signup Error:");
  console.error(error);

  return NextResponse.json(
    {
      message: error.message,
      error: String(error),
    },
    { status: 500 }
  );
}
}