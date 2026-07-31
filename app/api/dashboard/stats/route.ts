import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";

import Event from "@/models/Event";
import Resource from "@/models/Resource";
import Job from "@/models/Job";
import Announcement from "@/models/Announcement";
import User from "@/models/User";

export async function GET() {
  try {
    await connectDB();

    const [
      events,
      resources,
      jobs,
      announcements,
      students,
    ] = await Promise.all([
      Event.countDocuments(),
      Resource.countDocuments(),
      Job.countDocuments(),
      Announcement.countDocuments(),
      User.countDocuments({ role: "student" }),
    ]);

    return NextResponse.json({
      success: true,
      events,
      resources,
      jobs,
      announcements,
      students,
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