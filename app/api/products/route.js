import { NextResponse } from "next/server";

const apiBase = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000";

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const search = url.search || "";
    const resp = await fetch(`${apiBase}/api/products${search}`, {
      cache: "no-store",
    });
    const data = await resp.json().catch(() => ({}));
    return NextResponse.json(data, { status: resp.status });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
