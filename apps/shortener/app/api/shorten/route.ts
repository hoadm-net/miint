import { prisma } from '@repo/db/client';
import { NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import bcrypt from 'bcryptjs';

interface Body {
  url?: string;
  custom?: string;
  ttl?: number; // seconds (fallback)
  expiresAt?: string; // ISO string
  password?: string;
}

const SLUG_REGEX = /^[a-zA-Z0-9_-]{3,30}$/;
const MIN_TTL = 60;
const MAX_TTL = 60 * 60 * 24 * 30; // 30 days

export async function POST(req: Request) {
  const data = (await req.json()) as Body;
  const original = data.url?.trim();
  if (!original || !original.startsWith('http'))
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });

  let slug = (data.custom || '').trim();
  if (slug) {
    if (!SLUG_REGEX.test(slug))
      return NextResponse.json({ error: 'Invalid custom slug' }, { status: 400 });
    const exist = await prisma.url.findUnique({ where: { slug } });
    if (exist) return NextResponse.json({ error: 'Slug already in use' }, { status: 409 });
  } else {
    const VALID_FIRST = /[a-zA-Z0-9]/;
    do {
      slug = nanoid(6);
    } while (!VALID_FIRST.test(slug[0]));
  }

  let expiresAt: Date;
  if (data.expiresAt) {
    expiresAt = new Date(data.expiresAt);
    const diff = expiresAt.getTime() - Date.now();
    if (isNaN(expiresAt.getTime()) || diff < MIN_TTL * 1000 || diff > MAX_TTL * 1000) {
      return NextResponse.json({ error: 'Invalid expiresAt' }, { status: 400 });
    }
  } else {
    let ttl = data.ttl ?? 60 * 60 * 24; // default 24h
    ttl = Math.min(Math.max(ttl, MIN_TTL), MAX_TTL);
    expiresAt = new Date(Date.now() + ttl * 1000);
  }

  const passwordHash = data.password ? await bcrypt.hash(data.password, 8) : null;

  await prisma.url.create({
    data: {
      slug,
      original,
      expiresAt,
      password: passwordHash ?? undefined,
    },
  });

  const host = req.headers.get('host') || 'go.miint.dev';
  const protocol = host.startsWith('localhost') ? 'http' : 'https';
  const short = `${protocol}://${host}/${slug}`;
  const res = NextResponse.json({ slug, short });

  const origin = req.headers.get('origin') || '';
  const allowed = /^https?:\/\/([a-z0-9-]+\.)*miint\.dev(?::\d+)?$/i;
  if (allowed.test(origin)) {
    res.headers.set('Access-Control-Allow-Origin', origin);
  }
  res.headers.set('Vary', 'Origin');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  res.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  return res;
}

export function OPTIONS(req: Request) {
  const res = new NextResponse(null, { status: 204 });
  const origin = req.headers.get('origin') || '';
  const allowed = /^https?:\/\/([a-z0-9-]+\.)*miint\.dev(?::\d+)?$/i;
  if (allowed.test(origin)) {
    res.headers.set('Access-Control-Allow-Origin', origin);
  }
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  res.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.headers.set('Vary', 'Origin');
  return res;
} 