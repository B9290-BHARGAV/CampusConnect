import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";

import Event from "@/models/Event";
import Job from "@/models/Job";
import Resource from "@/models/Resource";
import Announcement from "@/models/Announcement";

export async function GET() {
  try {
    await connectDB();

    const [events, jobs, resources, announcements] = await Promise.all([
      Event.find().sort({ createdAt: -1 }).limit(2),
      Job.find().sort({ createdAt: -1 }).limit(2),
      Resource.find().sort({ createdAt: -1 }).limit(2),
      Announcement.find().sort({ createdAt: -1 }).limit(2),
    ]);

    return NextResponse.json({
      success: true,
      events,
      jobs,
      resources,
      announcements,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      {
        status: 500,
      }
    );
  }
}