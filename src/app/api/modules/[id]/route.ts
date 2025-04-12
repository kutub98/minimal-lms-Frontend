// import { NextRequest, NextResponse } from "next/server";

// export async function PATCH(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const token = req.headers.get("Authorization") || "";
//     const { id } = params;
//     const body = await req.json();

//     const response = await fetch(
//       `https://minimal-lms-backend.vercel.app/api/v1/modules/${id}`,
//       {
//         method: "PATCH", // or "PUT" if the backend requires it
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: token
//         },
//         body: JSON.stringify(body)
//       }
//     );

//     const data = await response.json();

//     if (!response.ok) {
//       return NextResponse.json(data, { status: response.status });
//     }

//     return NextResponse.json(data);
//   } catch (error) {
//     console.error("Error UPDATE module:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const { id } = params; // ✅ Fixed: no await here
//     const token = req.headers.get("Authorization") || "";

//     const response = await fetch(
//       `https://minimal-lms-backend.vercel.app/api/v1/modules/${id}`,
//       {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: token
//         }
//       }
//     );

//     const data = await response.json();

//     if (!response.ok) {
//       return NextResponse.json(data, { status: response.status });
//     }

//     return NextResponse.json(data);
//   } catch (error) {
//     console.error("Error deleting module:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

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
      `https://minimal-lms-backend.vercel.app/api/v1/modules/${id}`,
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



export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const token = req.headers.get("Authorization") || "";

    const response = await fetch(
      `https://minimal-lms-backend.vercel.app/api/v1/modules/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        }
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error deleting module:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
