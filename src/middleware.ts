import { NextRequest, NextResponse } from "next/server";
import { decodeTokens, EnumTokens } from "./services/auth-token.service";
import {CLIENT_PAGES, DASHBOARD_PAGES} from "./config/pages-url.config";
import { ACCESS_URL } from './config/access-url.config'

export async function middleware(
  request: NextRequest,
) {
  const { url, cookies, nextUrl } = request

  const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value
  const accessToken = cookies.get(EnumTokens.ACCESS_TOKEN)?.value
  const user = decodeTokens(accessToken)
  const userType = user?.user_type as keyof typeof ACCESS_URL

  const allowedRoutes = ACCESS_URL[userType as keyof typeof ACCESS_URL] || []

  const isAuthPage = url.includes('/auth')
  const isDashboardPage = nextUrl.pathname.startsWith("/dashboard");
  const isClientPage = nextUrl.pathname.startsWith("/client");
  const isClientFeedPage = nextUrl.pathname.match(/^\/client\/feed\/\d+/);

  if (url === '/') {
    if (refreshToken && user) {
      return redirectToUserDashboard(userType, request);
    }
    return NextResponse.redirect(new URL(CLIENT_PAGES.FEED, request.url));
  }
  
  if (isAuthPage && refreshToken) {
    return redirectToUserDashboard(userType, request)
  }

  if (isAuthPage) {
    return NextResponse.next();
  }

  if (allowedRoutes.length === 0 && (nextUrl.pathname.startsWith("/client/feed") || isClientFeedPage)) {
    return NextResponse.next();
  }

  if (isDashboardPage || isClientPage) {
    const cleanedPathname = isDashboardPage
      ? nextUrl.pathname.replace("/dashboard", "")
      : nextUrl.pathname.replace("/client", "");
    
    if (!matchRoute(cleanedPathname, allowedRoutes)) {
      return redirectToUserDashboard(userType, request);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/auth/:path*', '/dashboard/:path*', '/client/:path*'],
}

function redirectToUserDashboard(userType: string, request: NextRequest) {
  const userRoutes: Record<string, string> = {
    worker: DASHBOARD_PAGES.BUSINESS_CARS,
    admin: DASHBOARD_PAGES.BUSINESS_CARS,
    customer: CLIENT_PAGES.FEED,
    superuser: DASHBOARD_PAGES.SUPER_BUSINESS,
  };

  const fallbackRoute = CLIENT_PAGES.FEED;
  const targetRoute = userRoutes[userType] || fallbackRoute;

  if (request.nextUrl.pathname === targetRoute) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL(targetRoute, request.url));
}

function matchRoute(pathname: string, allowedRoutes: string[]): boolean {
  return allowedRoutes.some((route) => {
    const pattern = new RegExp("^" + route.replace("*", ".*") + "$");
    return pattern.test(pathname);
  })
}
