// app/api/course/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://minimal-lms-backend.vercel.app/api/v1/courses", {
      cache: "no-store", // To always fetch fresh data
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch courses: ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}
