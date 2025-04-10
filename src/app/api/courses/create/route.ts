// app/api/courses/create/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const token = req.headers.get("Authorization")?.replace("Bearer ", "") || "";

    const response = await fetch("https://minimal-lms-backend.vercel.app/api/v1/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Course Creation Error:", error);
    return NextResponse.json({ error: "Failed to create course" }, { status: 500 });
  }
}
