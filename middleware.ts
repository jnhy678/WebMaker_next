import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log('middleware: ',request.nextUrl.pathname)
    if (request.nextUrl.pathname.startsWith('/login')) {
      // return NextResponse.rewrite(new URL('/api', request.url))
      console.log('로그인하니')
      return NextResponse.redirect(new URL("/", request.url))
      // return NextResponse.rewrite(new URL('/main'))
    }
   
    if (request.nextUrl.pathname.startsWith('/signup')) {
      return NextResponse.rewrite(new URL('/main', request.url))
    }
}
// See "Matching Paths" below to learn more
  // matcher: [
  //   /*
  //    * 아래와 같이 시작하는 것들을 제외한 모두 경로를 매치합니다:
  //    * - api (API routes)
  //    * - _next/static (static files)
  //    * - _next/image (image optimization files)
  //    * - favicon.ico (favicon file)
  //    */
  //   "/((?!api|_next/static|_next/image|favicon.ico).*)",
  // ],
export const config = {
  matcher: [
    '/login/:path*', 
    '/main/:path*', 
    '/signup/:path*'
  ],
}