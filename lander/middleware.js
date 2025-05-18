// middleware.js (Vercel Edge Middleware)
import { NextResponse } from 'next/server';

export function middleware(request) {
  const ua = request.headers.get('user-agent') || '';
  const url = request.nextUrl;

  // Basic bot detection based on common ad review and crawler user agents
  const isBot = /bot|crawler|spider|preview|facebook|google|twitter|pinterest|linkedin|whatsapp/i.test(ua);

  // Optional: block traffic from certain countries (e.g., non-US)
  // const country = request.geo?.country || '';
  // const isBlockedCountry = !['US', 'CA'].includes(country);

  if (isBot) {
    // Route bots to a clean safe page (static file like /safe.html in /public)
    url.pathname = '/safe.html';
    return NextResponse.rewrite(url);
  }

  // Optionally log real users
  // console.log('Real user:', ua);

  // Let normal traffic through
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/offer1',
    '/offer2',
    '/offer3',
    '/cloak1',
    '/cloak2',
    '/cloak3',
    '/:path*' // Applies to all pages — change if needed
  ]
};
