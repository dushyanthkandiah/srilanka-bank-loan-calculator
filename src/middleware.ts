import { NextResponse } from 'next/server';
import type { NextRequest, NextFetchEvent } from 'next/server';

export function middleware(request: NextRequest, event: NextFetchEvent) {
  // Get geo information from Vercel's injected headers
  const country = request.headers.get('x-vercel-ip-country') || 'Unknown';
  const city = request.headers.get('x-vercel-ip-city') || 'Unknown';
  const region = request.headers.get('x-vercel-ip-country-region') || 'Unknown';
  const latitude = request.headers.get('x-vercel-ip-latitude') || 'Unknown';
  const longitude = request.headers.get('x-vercel-ip-longitude') || 'Unknown';

  // Call the tracking API route
  // We use event.waitUntil to ensure the fetch completes even after the response is sent
  const apiUrl = new URL('/api/location', request.url);
  event.waitUntil(
    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'x-visitor-country': country,
        'x-visitor-city': city,
        'x-visitor-region': region,
        'x-visitor-latitude': latitude,
        'x-visitor-longitude': longitude,
      },
    }).then(async (res) => {
      if (!res.ok) {
        console.error(`Middleware: Failed to track visit. Status: ${res.status}`);
        const text = await res.text();
        console.error('Middleware: Response:', text);
      }
    }).catch((err) => console.error('Middleware: Error tracking visit:', err))
  );

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-visitor-country', country);
  requestHeaders.set('x-visitor-city', city);
  requestHeaders.set('x-visitor-region', region);
  requestHeaders.set('x-visitor-latitude', latitude);
  requestHeaders.set('x-visitor-longitude', longitude);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
