import { prisma } from '@repo/db/client';
import { NextResponse, type NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { parse } from 'node-html-parser';

// helper to fetch title
async function fetchTitle(url: string): Promise<string> {
  try {
    const controller = new AbortController();
    const to = setTimeout(() => controller.abort(), 3000);
    const res = await fetch(url, { method: 'GET', redirect: 'follow', headers: { 'User-Agent': 'MiintBot/1.0' }, signal: controller.signal });
    clearTimeout(to);
    if (!res.ok) return url;
    const reader = res.body?.getReader();
    if (!reader) return url;
    const chunks: Uint8Array[] = [];
    let received = 0;
    while (received < 65536) { // 64 KB
      const { done, value } = await reader.read();
      if (done || !value) break;
      chunks.push(value);
      received += value.length;
    }
    const html = new TextDecoder().decode(Buffer.concat(chunks));
    const root = parse(html);
    const og = root.querySelector('meta[property="og:title"]')?.getAttribute('content');
    if (og) return og;
    const title = root.querySelector('title')?.text;
    return title || url;
  } catch {
    return url;
  }
}

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.pathname.slice(1); // remove leading '/'
  const record = await prisma.url.findUnique({ where: { slug } });
  if (!record) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  if (record.expiresAt < new Date()) {
    // Optionally delete expired URL
    return NextResponse.json({ error: 'Link expired' }, { status: 410 });
  }

  const urlObj = new URL(req.url);
  const pwd = urlObj.searchParams.get('pwd') || '';

  if (record.password) {
    const ok = await bcrypt.compare(pwd, record.password);
    if (!ok) {
      const html = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Password Required</title><style>body{margin:0;font-family:Arial,Helvetica,sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#eff6ff,#fff,#f5f3ff)}.card{background:#fff;border:1px solid #e5e7eb;border-radius:1rem;box-shadow:0 10px 15px -3px rgba(0,0,0,.1);padding:2rem;width:100%;max-width:22rem}.card h1{font-size:1.5rem;font-weight:700;margin-bottom:1.5rem;text-align:center;color:#111827}.card input{width:100%;border:1px solid #d1d5db;border-radius:.5rem;padding:.75rem;font-size:.875rem;margin-bottom:1rem}.card button{width:100%;background:#2563eb;color:#fff;border:none;border-radius:.75rem;padding:.75rem;font-weight:500;cursor:pointer;transition:background .2s}.card button:hover{background:#1d4ed8}</style></head><body><form method="GET" class="card"><h1>Enter Password</h1><input type="password" name="pwd" placeholder="Password" required/><button type="submit">Unlock</button></form></body></html>`;
      return new Response(html, { status: 200, headers: { 'Content-Type': 'text/html' } });
    }
  }

  const confirmed = urlObj.searchParams.get('continue') === '1';

  if (!confirmed) {
    const title = await fetchTitle(record.original);
    const domain = new URL(record.original).hostname;
    const previewHtml = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Preview Link</title><style>body{margin:0;font-family:Arial,Helvetica,sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#eff6ff,#fff,#f5f3ff)}.card{background:#fff;border:1px solid #e5e7eb;border-radius:1rem;box-shadow:0 10px 15px -3px rgba(0,0,0,.1);padding:2rem;width:100%;max-width:28rem;text-align:center}.card h1{font-size:1.25rem;font-weight:700;color:#111827;margin-bottom:.5rem}.card p{font-size:.875rem;color:#4b5563;word-break:break-all;margin-bottom:1.5rem}.btn{display:inline-block;padding:.75rem 1.5rem;border-radius:.75rem;font-weight:500;text-decoration:none}.continue{background:#2563eb;color:#fff;margin-right:.5rem}.cancel{background:#e5e7eb;color:#374151}</style></head><body><div class="card"><h1>${title}</h1><p>${domain}</p><a class="btn continue" href="/${record.slug}?continue=1${pwd ? `&pwd=${encodeURIComponent(pwd)}` : ''}">Continue</a><a class="btn cancel" href="https://miint.dev">Cancel</a></div></body></html>`;
    return new Response(previewHtml, { status: 200, headers: { 'Content-Type': 'text/html' } });
  }

  await prisma.url.update({ where: { id: record.id }, data: { clicks: { increment: 1 } } });
  return NextResponse.redirect(record.original, 302);
} 