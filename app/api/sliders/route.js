import { NextResponse } from 'next/server';

const apiBase = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';

export async function GET() {
  try {
    const resp = await fetch(`${apiBase}/api/sliders`, { cache: 'no-store' });
    const data = await resp.json().catch(() => ({}));
    return NextResponse.json(data, { status: resp.status });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch sliders' }, { status: 500 });
  }
}


