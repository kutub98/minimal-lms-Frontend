import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [modulesRes, lecturesRes] = await Promise.all([
      fetch("https://minimal-lms-backend.vercel.app/api/v1/modules", {
        cache: "no-store",
      }),
      fetch("https://minimal-lms-backend.vercel.app/api/v1/lectures", {
        cache: "no-store",
      }),
    ]);

    if (!modulesRes.ok || !lecturesRes.ok) {
      throw new Error("Failed to fetch data from one or more endpoints.");
    }

    const [modulesData, lecturesData] = await Promise.all([
      modulesRes.json(),
      lecturesRes.json(),
    ]);

    return NextResponse.json({
      modules: modulesData,
      lectures: lecturesData,
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch modules and lectures" },
      { status: 500 }
    );
  }
}
