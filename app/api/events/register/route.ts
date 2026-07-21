import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Registration from "@/models/Registration";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { studentId, eventId } = await req.json();

    if (!studentId || !eventId) {
      return NextResponse.json(
        {
          message: "Student ID and Event ID are required",
        },
        {
          status: 400,
        }
      );
    }

    // Check if already registered
    const alreadyRegistered = await Registration.findOne({
      studentId,
      eventId,
    });

    if (alreadyRegistered) {
      return NextResponse.json(
        {
          message: "You are already registered for this event.",
        },
        {
          status: 400,
        }
      );
    }

    const registration = await Registration.create({
      studentId,
      eventId,
    });

    return NextResponse.json(
      {
        message: "Registration Successful!",
        registration,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}