import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher(['/sign-in(.*)'])
const isAdminRoute = createRouteMatcher(['/'])

export default clerkMiddleware(async (auth, req) => {
  const { sessionClaims } = await auth()
  
  // Protect admin route - only users with admin role can access
  if (isAdminRoute(req) && sessionClaims?.metadata?.role !== 'admin') {
    const url = new URL('/not-authorized', req.url)
    return NextResponse.redirect(url)
  }
  
  // Protect all other non-public routes
  if (!isPublicRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}