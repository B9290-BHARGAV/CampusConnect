import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";

import User from "@/models/User";
import Event from "@/models/Event";
import Job from "@/models/Job";
import Announcement from "@/models/Announcement";
import Resource from "@/models/Resource";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    // Get date 7 days ago for recent signups
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const [
      totalUsers,
      students,
      faculty,
      admins,
      events,
      jobs,
      announcements,
      resources,
      recentSignups,
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: "student" }),
      User.countDocuments({ role: "faculty" }),
      User.countDocuments({ role: "admin" }),
      Event.countDocuments(),
      Job.countDocuments(),
      Announcement.countDocuments(),
      Resource.countDocuments(),
      User.countDocuments({ createdAt: { $gte: sevenDaysAgo } }),
    ]);

    return NextResponse.json({
      success: true,
      totalUsers,
      students,
      faculty,
      admins,
      events,
      jobs,
      announcements,
      resources,
      recentSignups,
    });
  } catch (error) {
    console.error("ADMIN STATS ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
