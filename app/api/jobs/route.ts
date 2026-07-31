import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";

import Job from "@/models/Job";

export async function GET() {
  try {
    await connectDB();

    const jobs = await Job.find()
      .populate("postedBy", "fullName email")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch jobs.",
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
      company,
      description,
      location,
      type,
      salary,
      applyLink,
      companyLogo,
    } = body;

    if (
      !title ||
      !company ||
      !description ||
      !location ||
      !type ||
      !applyLink
    ) {
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

    const job = await Job.create({
      title,
      company,
      description,
      location,
      type,
      salary,
      applyLink,
      companyLogo,
      postedBy: session.user.id,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Job posted successfully.",
        job,
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