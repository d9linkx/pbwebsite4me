import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  const url = request.nextUrl.clone()

  // Check if this is the app subdomain
  const isAppSubdomain = hostname.startsWith('app.')

  // Don't modify paths for static files from public folder
  // These should be served directly by Next.js
  if (url.pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|webp|woff|woff2)$/)) {
    return NextResponse.next()
  }

  // For app subdomain, we don't need to modify paths
  // Next.js App Router handles /app directory automatically
  if (isAppSubdomain) {
    // Just set headers for app subdomain context
    const response = NextResponse.next()
    response.headers.set('x-subdomain', 'app')
    response.headers.set('x-pathname', url.pathname)
    return response
  }

  // For website domain, prefix routes with /website
  if (!url.pathname.startsWith('/website') && !url.pathname.startsWith('/api')) {
    url.pathname = `/website${url.pathname}`
  }

  // Set a custom header to indicate which subdomain we're on
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
