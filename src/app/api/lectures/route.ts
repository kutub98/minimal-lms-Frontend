import { NextResponse, type NextRequest } from "next/server";

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


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const token = req.headers.get("Authorization") || "";

    const res = await fetch('https://minimal-lms-backend.vercel.app/api/v1/lectures', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}