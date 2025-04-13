import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [modulesRes, lecturesRes, coursesRes] = await Promise.all([
      fetch("https://minimal-lms-backend.vercel.app/api/v1/modules", {
        cache: "no-store",
      }),
      fetch("https://minimal-lms-backend.vercel.app/api/v1/lectures", {
        cache: "no-store",
      }),
      fetch("https://minimal-lms-backend.vercel.app/api/v1/courses", {
        cache: "no-store",
      }),
    ]);

    if (!modulesRes.ok || !lecturesRes.ok || !coursesRes.ok) {
      throw new Error("Failed to fetch data from one or more endpoints.");
    }

    const [modulesData, lecturesData, coursesData] = await Promise.all([
      modulesRes.json(),
      coursesRes.json(),
      lecturesRes.json(),
    ]);
console.log(modulesData, lecturesData, coursesData, 'api of lectures')
    return NextResponse.json({
      modules: modulesData,
      lectures: lecturesData,
      courses: coursesData
    });
    
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch modules and lectures" },
      { status: 500 }
    );
  }
}
