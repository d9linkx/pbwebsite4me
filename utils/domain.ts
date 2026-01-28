import { headers } from 'next/headers'

export async function getCurrentSubdomain(): Promise<'app' | 'website'> {
  // Check if we're in app routes (pathname starts with /app)
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') || ''

  if (pathname.startsWith('/app')) {
    return 'app'
  }

  return 'website'
}

export async function isAppRoute(): Promise<boolean> {
  return (await getCurrentSubdomain()) === 'app'
}

export async function isWebsiteRoute(): Promise<boolean> {
  return (await getCurrentSubdomain()) === 'website'
}
