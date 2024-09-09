import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

export async function middleware(req) {
  const cookieStore = cookies();

  if(!cookieStore.get('token')) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  try {
    const token = cookieStore.get('token').value;
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }
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
