import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";

import Resource from "@/models/Resource";

export async function GET() {
  try {
    await connectDB();

    const resources = await Resource.find()
      .populate("uploadedBy", "fullName email")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      count: resources.length,
      resources,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch resources.",
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
      subject,
      semester,
      resourceUrl,
      thumbnail,
    } = body;

    if (
      !title ||
      !description ||
      !category ||
      !subject ||
      !semester ||
      !resourceUrl
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

    const resource = await Resource.create({
      title,
      description,
      category,
      subject,
      semester,
      resourceUrl,
      thumbnail,
      uploadedBy: session.user.id,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Resource uploaded successfully.",
        resource,
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