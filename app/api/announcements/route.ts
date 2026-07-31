import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";

import Announcement from "@/models/Announcement";

export async function GET() {
  try {
    await connectDB();

    const announcements = await Announcement.find()
      .populate("createdBy", "fullName email")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      count: announcements.length,
      announcements,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch announcements.",
      },
      {
        status: 500,
      }
    );
  }
}

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
        {
          status: 401,
        }
      );
    }

    const body = await req.json();

    const {
      title,
      description,
      category,
      priority,
    } = body;

    if (!title || !description) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill all required fields.",
        },
        {
          status: 400,
        }
      );
    }

    const announcement = await Announcement.create({
      title,
      description,
      category,
      priority,
      createdBy: session.user.id,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Announcement created successfully.",
        announcement,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}