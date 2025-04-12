// import { NextRequest, NextResponse } from "next/server";

// const baseUrl = "https://minimal-lms-backend.vercel.app/api/v1/courses";

// export async function GET(
//   request: NextRequest,
//   context: { params: { id: string } }
// ) {
//   const { id } = context.params;

//   try {
//     const res = await fetch(`${baseUrl}/${id}`);
//     const data = await res.json();

//     if (!res.ok) {
//       return NextResponse.json(data, { status: res.status });
//     }

//     return NextResponse.json(data);
//   } catch (error) {
//     console.error("❌ Error fetching course:", error);
//     return NextResponse.json({ error: "Failed to fetch course" }, { status: 500 });
//   }
// }



// export async function PATCH(
//   request: NextRequest,
//   context: { params: Promise<{ id: string }> }
// ) {
//   const { id } = await context.params;
//   console.log(id, "from update course");

//   const body = await request.json();
//   const token = request.headers.get("token") || "";

//   try {
//     const response = await fetch(`${baseUrl}/${id}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: token,
//       },
//       body: JSON.stringify(body),
//     });

//     const data = await response.json();
//     console.log(body, 'from body courses')

//     if (!response.ok) {
//       return NextResponse.json(data, { status: response.status });
//     }

//     return NextResponse.json(data);
//   } catch (error) {
//     console.error("❌ Error updating course:", error);
//     return NextResponse.json(
//       { error: "Failed to update course" },
//       { status: 500 }
//     );
//   }
// }







// export async function DELETE(
//   request: NextRequest,
//   context: { params: Promise<{ id: string }> }
// ) {
//   const { id } = await context.params;
//   console.log(id, 'from delete api')
//  const token = request.headers.get('token') || '';
//   console.log(token, 'token from request.headers')
  

//   try {
//     const response = await fetch(`${baseUrl}/${id}`, {
//       method: 'DELETE',
//       headers: {
//         Authorization: token,
//       },
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       return NextResponse.json(data, { status: response.status });
//     }

//     return NextResponse.json(data);
//   } catch (error) {
//     console.error('❌ Error deleting course:', error);
//     return NextResponse.json(
//       { error: 'Failed to delete course' },
//       { status: 500 }
//     );
//   }
// }

import { NextRequest, NextResponse } from "next/server";

const baseUrl = "https://minimal-lms-backend.vercel.app/api/v1/courses";

// This GET handler remains as is, but we'll explicitly use `await` on the params
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // Wait for params to resolve

  try {
    const res = await fetch(`${baseUrl}/${id}`);
    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("❌ Error fetching course:", error);
    return NextResponse.json({ error: "Failed to fetch course" }, { status: 500 });
  }
}

// This PATCH handler also needs to await the params.
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // Await the params

  const body = await request.json();
  const token = request.headers.get("token") || "";

  try {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("❌ Error updating course:", error);
    return NextResponse.json(
      { error: "Failed to update course" },
      { status: 500 }
    );
  }
}

// DELETE handler also expects the params to be a Promise
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // Await the params

  const token = request.headers.get("token") || "";

  try {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: token,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('❌ Error deleting course:', error);
    return NextResponse.json(
      { error: 'Failed to delete course' },
      { status: 500 }
    );
  }
}















