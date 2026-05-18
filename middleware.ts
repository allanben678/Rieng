import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const session = request.cookies.get('sales_session')
  const { pathname } = request.nextUrl
  const isLoginPage = pathname === '/sales/login'

  // Not logged in → go to login
  if (!session && !isLoginPage) {
    return NextResponse.redirect(new URL('/sales/login', request.url))
  }

  // Already logged in → skip login page
  if (session && isLoginPage) {
    return NextResponse.redirect(new URL('/sales', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/sales/:path*'],
}
