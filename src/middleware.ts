import { NextRequest, NextResponse } from "next/server";
import { EnumTokens } from "./services/auth-token.service";
import { DASHBOARD_PAGES } from "./config/pages-url.config";

export async function middleware(request: NextRequest) {
  const { url, cookies } = request;
  const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value;

  const isAuthPage = url.includes('/auth');

  if (isAuthPage && refreshToken) {
    return NextResponse.redirect(new URL(DASHBOARD_PAGES.BUSINESS_CARS, url));
  }

  if (isAuthPage) {
    return NextResponse.next();
  }

  if (!refreshToken) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }


  const userData = JSON.parse(cookies.get("user")?.value || "{}"); 

  if (userData?.user_type === "admin" || userData?.user_type === "worker") {
    return NextResponse.redirect(new URL(DASHBOARD_PAGES.BUSINESS_CARS, url));
  }

  if (userData?.user_type === "customer") {
    return NextResponse.redirect(new URL(DASHBOARD_PAGES.FEED, url));
  }

  //раскомментировать когда будет панель суперюзера
  // if (userData?.user_type === "superuser") {
  //   return NextResponse.redirect(new URL(DASHBOARD_PAGES., url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ['/auth/:path*', '/dashboard/:path*']
};

