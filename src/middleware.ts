import { NextRequest, NextResponse } from "next/server";
import { EnumTokens } from "./services/auth-token.service";
import { DASHBOARD_PAGES } from "./config/pages-url.config";

export async function middleware(
  request: NextRequest,
) {
  const { url, cookies, nextUrl } = request

  const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value

  const userJson = cookies.get('userData')?.value
  const user = userJson ? JSON.parse(userJson) : null
  const userType = user?.user_type as keyof typeof DASHBOARD_PAGES.ACCESS_URL

  const allowedRoutes = DASHBOARD_PAGES.ACCESS_URL[userType] || []

  const isAuthPage = url.includes('/auth')
  const isDashboardPage = nextUrl.pathname.startsWith("/dashboard");

  if (request.url.includes('404')) {
    console.log("404")
    return redirectToUserDashboard(userType, request)
  }

  //  console.log("IS_DASHBOARD: ", isDashboardPage)

  // if(!isDashboardPage && refreshToken) {
  //   return redirectToUserDashboard(userType, request)
  // }

  if (isDashboardPage) {
    if (!matchRoute(nextUrl.pathname.replace("/dashboard", ""), allowedRoutes)) {
      return redirectToUserDashboard(userType, request)
    }
  }

  if (isAuthPage && refreshToken) {
    return redirectToUserDashboard(userType, request)
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
  matcher: ['/', '/auth/:path*', '/dashboard/:path*'],
}

function redirectToUserDashboard(userType: string, request: NextRequest) {
  const userRoutes: Record<string, string> = {
    worker: DASHBOARD_PAGES.BUSINESS_CARS,
    admin: DASHBOARD_PAGES.BUSINESS_CARS,
    customer: DASHBOARD_PAGES.CUSTOMER_FEED,
    superuser: DASHBOARD_PAGES.SUPER_BUSINESS,
  };

  return NextResponse.redirect(new URL(userRoutes[userType] || "/auth", request.url));
}

function matchRoute(pathname: string, allowedRoutes: string[]): boolean {
  return allowedRoutes.some((route) => {
    const pattern = new RegExp("^" + route.replace("*", ".*") + "$");
    return pattern.test(pathname);
  })
}