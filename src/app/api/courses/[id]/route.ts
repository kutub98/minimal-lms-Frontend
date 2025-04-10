import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const courseId = (await params).id

  try {
    const res = await fetch(
      `https://minimal-lms-backend.vercel.app/api/v1/courses/${courseId}`
    );

    if (!res.ok) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", error },
      { status: 500 }
    );
  }
}