// // import { NextRequest, NextResponse } from "next/server";

// // export async function GET(
// //   req: NextRequest,
// //   { params }: { params: Promise<{ id: string }> }
// // ) {
// //   const id = (await params).id

// //   try {
// //     const res = await fetch(
// //       `https://minimal-lms-backend.vercel.app/api/v1/courses/${id}`
// //     );

// //     if (!res.ok) {
// //       return NextResponse.json(
// //         { message: "Course not found" },
// //         { status: res.status }
// //       );
// //     }

// //     const data = await res.json();
// //     return NextResponse.json(data);
// //   } catch (error) {
// //     return NextResponse.json(
// //       { message: "Something went wrong", error },
// //       { status: 500 }
// //     );
// //   }
// // }


// import { NextRequest, NextResponse } from "next/server";

// // ✅ GET all lectures for a given moduleId
// export async function GET(req: NextRequest) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const moduleId = searchParams.get("moduleId");

//     if (!moduleId) {
//       return NextResponse.json(
//         { error: "moduleId is required" },
//         { status: 400 }
//       );
//     }

//     const res = await fetch(
//       `https://minimal-lms-backend.vercel.app/api/v1/lectures/module/${moduleId}`,
//       { cache: "no-store" }
//     );

//     if (!res.ok) {
//       throw new Error(`Failed to fetch lectures: ${res.status}`);
//     }

//     const data = await res.json();
//     return NextResponse.json(data);
//   } catch (error) {
//     console.error("GET /api/lectures Error:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch lectures" },
//       { status: 500 }
//     );
//   }
// }

// // ✅ POST: Create a new lecture
// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const token = req.headers.get("Authorization") || "";

//     const response = await fetch(
//       "https://minimal-lms-backend.vercel.app/api/v1/lectures",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: token,
//         },
//         body: JSON.stringify(body),
//       }
//     );

//     const data = await response.json();

//     if (!response.ok) {
//       return NextResponse.json(data, { status: response.status });
//     }

//     return NextResponse.json(data);
//   } catch (error) {
//     console.error("POST /api/lectures Error:", error);
//     return NextResponse.json(
//       { error: "Failed to create lecture" },
//       { status: 500 }
//     );
//   }
// }

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const moduleId = searchParams.get("moduleId");

    if (!moduleId) {
      return NextResponse.json(
        { error: "moduleId is required" },
        { status: 400 }
      );
    }

    const res = await fetch(
      `https://minimal-lms-backend.vercel.app/api/v1/lectures/module/${moduleId}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch lectures: ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("GET /api/lectures Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch lectures" },
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
