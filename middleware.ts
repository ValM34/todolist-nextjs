import { NextResponse } from 'next/server'
import { isAuth, refreshToken } from '@/utils/auth'

export async function middleware(req: Request) {
  if (await isAuth()) {
    const token = await refreshToken()
    if (token) {
      const res = NextResponse.next()
      res.cookies.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24,
      })
      return res
    }
    return
  }

  const response = NextResponse.redirect(new URL('/sign-in', req.url))
  response.cookies.delete('token')
  return response
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|sign-in|sign-up).*)',
  ],
}