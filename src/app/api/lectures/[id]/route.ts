

import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const token = req.headers.get("Authorization") || "";
    const { id } = await context.params;
    const body = await req.json();

    const response = await fetch(
      `https://minimal-lms-backend.vercel.app/api/v1/lectures/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify(body)
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error updating module:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


// ✅ POST: Create a new lecture
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const token = req.headers.get("Authorization") || "";

    const response = await fetch(
      "https://minimal-lms-backend.vercel.app/api/v1/lectures",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("POST /api/lectures Error:", error);
    return NextResponse.json(
      { error: "Failed to create lecture" },
      { status: 500 }
    );
  }
}
