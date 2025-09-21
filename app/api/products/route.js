import { NextResponse } from "next/server";

const apiBase =
  process.env.NEXT_PUBLIC_API_BASE ||
  process.env.API_BASE ||
  "http://localhost:4000";

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const search = url.search || "";

    if (!apiBase) {
      return NextResponse.json(
        { error: "API base URL not configured" },
        { status: 500 }
      );
    }

    const resp = await fetch(`${apiBase}/api/products${search}`, {
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
    console.error("Products API error:", err);
    return NextResponse.json(
      { error: "Failed to fetch products", details: err.message },
      { status: 500 }
    );
  }
}
