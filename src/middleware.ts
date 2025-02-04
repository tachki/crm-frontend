import { NextRequest, NextResponse } from "next/server"
import { EnumTokens } from "./services/auth-token.service"
import { DASHBOARD_PAGES } from './config/pages-url.config'

export async function middleware(request: NextRequest) {
  const { cookies, nextUrl } = request
  const path = nextUrl.pathname

  const userJson = cookies.get('userData')?.value
  const user = userJson ? JSON.parse(userJson) : null
  const userType = user?.user_type ?? ''

  const isAuthPage = path.startsWith('/auth')
  const isDashboardRoot = path === '/dashboard'
  const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value

  if (isAuthPage && refreshToken) {
    return redirectToUserDashboard(userType, request)
  }

  if (isAuthPage) {
    return NextResponse.next()
  }

  if (!refreshToken) {
    return NextResponse.redirect(new URL('/auth', request.url))
  }

  if (isDashboardRoot) {
    return redirectToUserDashboard(userType, request)
  }

  const isAuthorized = DASHBOARD_PAGES.accessURLs[userType]?.some(regex => regex.test(path)) ?? false

  if (!isAuthorized) {
    return NextResponse.rewrite(new URL('/auth', request.url))
  }

  return NextResponse.next()
}

function redirectToUserDashboard(userType: string, request: NextRequest) {
  let redirectUrl = '/auth'

  if (userType === 'worker' || userType === 'admin') {
    redirectUrl = DASHBOARD_PAGES.BUSINESS_CARS
  } else if (userType === 'customer') {
    redirectUrl = DASHBOARD_PAGES.CUSTOMER_FEED
  } else if (userType === 'superuser') {
    redirectUrl = DASHBOARD_PAGES.SUPER_BUSINESS
  }

  return NextResponse.redirect(new URL(redirectUrl, request.url))
}

export const config = {
  matcher: ['/auth/:path*', '/dashboard/:path*']
}
