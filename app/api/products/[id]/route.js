import { NextResponse } from "next/server";

const apiBase =
  process.env.NEXT_PUBLIC_API_BASE ||
  process.env.API_BASE ||
  "http://localhost:4000";

export async function GET(request, { params }) {
  try {
    const { id } = params;

    if (!apiBase) {
      return NextResponse.json(
        { error: "API base URL not configured" },
        { status: 500 }
      );
    }

    const resp = await fetch(`${apiBase}/api/products/${id}`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!resp.ok) {
      return NextResponse.json(
        { error: `Backend API error: ${resp.status}` },
        { status: resp.status }
      );
    }

    const data = await resp.json();
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error("Product API error:", err);
    return NextResponse.json(
      { error: "Failed to fetch product", details: err.message },
      { status: 500 }
    );
  }
}
