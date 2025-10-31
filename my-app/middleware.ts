import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  const url = request.nextUrl.clone()

  // Check if this is localhost
  const isLocalhost = hostname.startsWith('localhost') || hostname.startsWith('127.0.0.1')
  
  // Check if this is the app subdomain (only in production)
  const isAppSubdomain = !isLocalhost && hostname.startsWith('app.')

  // Don't modify paths for static files from public folder
  if (url.pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|webp|woff|woff2)$/)) {
    return NextResponse.next()
  }

  // For local development, don't use subdomains
  if (isLocalhost) {
    // Dashboard/App routes that should NOT be rewritten to /website
    const appRoutes = [
      '/auth',
      '/email-verification',
      '/dashboard',
      '/jobs',
      '/wallet',
      '/settings',
      '/chat',
      '/notifications',
      '/proxy',
      '/help',
      '/sponsorship',
      '/referrals',
      '/ratings',
    ];

    // Check if this is an app route (root / now shows website landing page)
    const isAppRoute = appRoutes.some(route => url.pathname.startsWith(route));

    if (isAppRoute) {
      const response = NextResponse.next()
      response.headers.set('x-subdomain', 'app')
      return response
    }

    // For website routes, rewrite to /website if not already
    if (!url.pathname.startsWith('/website') && !url.pathname.startsWith('/api') && !url.pathname.startsWith('/_next')) {
      url.pathname = `/website${url.pathname}`
      const response = NextResponse.rewrite(url)
      response.headers.set('x-subdomain', 'website')
      return response
    }

    return NextResponse.next()
  }

  // For production app subdomain
  if (isAppSubdomain) {
    const response = NextResponse.next()
    response.headers.set('x-subdomain', 'app')
    response.headers.set('x-pathname', url.pathname)
    return response
  }

  // For production website domain
  // Dashboard/App routes that should NOT be rewritten to /website
  const appRoutes = [
    '/auth',
    '/email-verification',
    '/dashboard',
    '/jobs',
    '/wallet',
    '/settings',
    '/chat',
    '/notifications',
    '/proxy',
    '/help',
    '/sponsorship',
    '/referrals',
    '/ratings',
  ];

  // Check if this is an app route
  const isAppRoute = appRoutes.some(route => url.pathname.startsWith(route));

  if (isAppRoute) {
    const response = NextResponse.next()
    response.headers.set('x-subdomain', 'app')
    response.headers.set('x-pathname', url.pathname)
    return response
  }

  // For website routes, rewrite to /website if not already
  if (!url.pathname.startsWith('/website') && !url.pathname.startsWith('/api')) {
    url.pathname = `/website${url.pathname}`
  }

  const response = NextResponse.rewrite(url)
  response.headers.set('x-subdomain', 'website')
  response.headers.set('x-pathname', url.pathname)

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (Next.js static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
