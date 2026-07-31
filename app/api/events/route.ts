import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";

export async function POST(req: Request) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "faculty") {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const body = await req.json();

    const {
      title,
      description,
      category,
      location,
      date,
      time,
      organizer,
      capacity,
      image,
    } = body;

    if (
      !title ||
      !description ||
      !category ||
      !location ||
      !date ||
      !time ||
      !organizer
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill all required fields.",
        },
        { status: 400 }
      );
    }

    const event = await Event.create({
      title,
      description,
      category,
      location,
      date,
      time,
      organizer,
      capacity,
      image,
      createdBy: session.user.id,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Event created successfully.",
        event,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const events = await Event.find()
      .populate("createdBy", "fullName email")
      .sort({
        createdAt: -1,
      });

    return NextResponse.json({
      success: true,
      count: events.length,
      events,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch events.",
      },
      { status: 500 }
    );
  }
}