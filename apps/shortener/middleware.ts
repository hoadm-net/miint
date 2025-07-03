import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Only handle /api/* paths
  if (!request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  const response = NextResponse.next();

  const origin = request.headers.get('origin') || '';
  const allowed = /^https?:\/\/([a-z0-9-]+\.)*miint\.dev(?::\d+)?$/i;
  if (allowed.test(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
  }
  // Always vary on Origin so caches differentiate
  response.headers.set('Vary', 'Origin');

  response.headers.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: response.headers,
    });
  }

  return response;
}

export const config = {
  matcher: '/api/:path*',
}; 