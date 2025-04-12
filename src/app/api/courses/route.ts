// app/api/course/route.ts

import { NextRequest, NextResponse } from "next/server";
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




export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
const token = req.headers.get("Authorization") || "";
console.log("Token sent to backend:", token);

const response = await fetch("https://minimal-lms-backend.vercel.app/api/v1/courses", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: token,
  },
  body: JSON.stringify(body),
});

    
    const data = await response.json();

    console.log("🎯 Response from backend:", data);

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("❌ Error in /api/courses:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}




