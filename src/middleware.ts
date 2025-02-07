import { NextRequest, NextResponse } from "next/server";
import { EnumTokens } from "./services/auth-token.service";
import { DASHBOARD_PAGES } from "./config/pages-url.config";

function redirectToUserDashboard(userType: string, request: NextRequest) {
  let redirectUrl = ''

  if (userType === 'worker' || userType === 'admin') {
    redirectUrl = DASHBOARD_PAGES.BUSINESS_CARS
  } else if (userType === 'customer') {
    redirectUrl = DASHBOARD_PAGES.CUSTOMER_FEED
  } else if (userType === 'superuser') {
    redirectUrl = DASHBOARD_PAGES.SUPER_BUSINESS
  }

  return NextResponse.redirect(new URL(redirectUrl, request.url))
}

function matchRoute(pathname: string, allowedRoutes: string[]): boolean {
  return allowedRoutes.some((route) => {
    const pattern = new RegExp("^" + route.replace("*", ".*") + "$");

    return pattern.test(pathname);
  })
}

export async function middleware(
  request: NextRequest,
) {
  const { url, cookies, nextUrl } = request

  const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value

  const userJson = cookies.get('userData')?.value
  const user = userJson ? JSON.parse(userJson) : null
  const userType = user?.user_type as keyof typeof DASHBOARD_PAGES.ACCESS_URL

  const isAuthPage = url.includes('/auth')
  const isDashboardPage = nextUrl.pathname.startsWith("/dashboard");

  if (isAuthPage && refreshToken) {
    return redirectToUserDashboard(userType, request)
  }

  if (isAuthPage) {
    return NextResponse.next()
  }

  if(!refreshToken) {
    return NextResponse.redirect(new URL('/auth', request.url))
  }

  if (isDashboardPage) {
    const allowedRoutes = DASHBOARD_PAGES.ACCESS_URL[userType] || []

    if (!matchRoute(nextUrl.pathname.replace("/dashboard", ""), allowedRoutes)) {
      return new NextResponse("Forbidden", { status: 403 })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/auth/:path*', '/dashboard/:path*']
}