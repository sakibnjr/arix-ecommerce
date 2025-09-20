import { NextResponse } from 'next/server';

const apiBase = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';

export async function POST(request) {
  try {
    const token = request.cookies.get('admin_token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const formData = await request.formData();
    const resp = await fetch(`${apiBase}/api/uploads?folder=${encodeURIComponent(request.nextUrl.searchParams.get('folder') || '')}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const data = await resp.json().catch(() => ({}));
    return NextResponse.json(data, { status: resp.status });
  } catch (err) {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }
}


