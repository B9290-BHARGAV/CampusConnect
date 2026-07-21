import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      title,
      description,
      location,
      date,
      organizer,
      image,
    } = body;

    if (
      !title ||
      !description ||
      !location ||
      !date ||
      !organizer
    ) {
      return NextResponse.json(
        { message: "Please fill all required fields." },
        { status: 400 }
      );
    }

    const event = await Event.create({
      title,
      description,
      location,
      date,
      organizer,
      image,
    });

    return NextResponse.json(
      {
        message: "Event Created Successfully",
        event,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const events = await Event.find().sort({
      createdAt: -1,
    });

    return NextResponse.json(events);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}