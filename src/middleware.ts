import { NextRequest, NextResponse } from "next/server";
import { EnumTokens } from "./services/auth-token.service";
import { DASHBOARD_PAGES } from "./config/pages-url.config";

export async function middleware(
  request: NextRequest,
) {
  const { url, cookies } = request

  const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value

  const isAuthPage = url.includes('/auth')
  if(isAuthPage) console.log("IsAUTHPAGE ", isAuthPage)
  else console.log("dont auth page")
  

  if (isAuthPage && refreshToken) {
    console.log("redirect on: ", new URL(DASHBOARD_PAGES.BUSINESS_CARS, url))
    return NextResponse.redirect(new URL(DASHBOARD_PAGES.BUSINESS_CARS, url))
  }

  if (isAuthPage) {
    return NextResponse.next()
  }

  if(!refreshToken) {
    return NextResponse.redirect(new URL('/auth', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/auth/:path*', '/dashboard/:path*']
}
