// Temporary debug endpoint — returns the classified sections as JSON.
// Visit /api/debug-classify?slug=wooden-sofa-tray-manufacturer
// (delete this file when done debugging)

import { NextResponse } from 'next/server';
import { classifyWpPage } from '@/lib/wp-classify-page';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const slug = new URL(request.url).searchParams.get('slug') || 'wooden-sofa-tray-manufacturer';
  const data = classifyWpPage(slug);
  if (!data) return NextResponse.json({ error: 'page not found' }, { status: 404 });

  return NextResponse.json({
    slug,
    h1: data.h1,
    introLen: data.intro?.length || 0,
    introHead: (data.intro || '').slice(0, 200),
    sections: data.sections.map((s, i) => ({
      idx: i,
      type: s.type,
      title: s.title,
      items: s.items?.length || 0,
    })),
  });
}
