import { NextResponse } from 'next/server';
import {isAuth} from "@/utils/auth";

export async function middleware(req: Request) {
  await isAuth() ? NextResponse.next() : NextResponse.redirect(new URL('/sign-in', req.url))
}

// See "Matching Paths" below to learn more
export const config = {
  // matcher: '/about/:path*',
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - signin
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|sign-in|sign-up).*)',
  ],
}
