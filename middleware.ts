import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log('request.nextUrl.pathname',request.nextUrl.pathname)
    if (request.nextUrl.pathname.startsWith('/api/:path')) {
      // return NextResponse.rewrite(new URL('/api', request.url))
      return NextResponse.rewrite(new URL('/main'))
    }
   
    if (request.nextUrl.pathname.startsWith('/dashboard')) {
      return NextResponse.rewrite(new URL('/dashboard/user', request.url))
    }
}
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/about/:path*',
}