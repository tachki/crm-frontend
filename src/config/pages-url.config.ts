class DASHBOARD {
  private root = '/dashboard'

  private businessRoot = '/business'
  private superRoot = '/super'

  AUTH = `/auth`
  BUSINESS_CARS = `${this.root}${this.businessRoot}/cars`
  CREATE = `${this.root}${this.businessRoot}/create`
  CAR_DETAILS = `${this.BUSINESS_CARS}/[id]`
  CUSTOMER_FEED = `${this.root}/feed`
  SUPER_BUSINESS = `${this.root}${this.superRoot}/businesses`

  accessURLs: Record<string, RegExp[]> = {
    worker: [/^\/dashboard\/business/, /^\/dashboard/],
    admin: [/^\/dashboard\/business/, /^\/dashboard/],
    superuser: [/^\/dashboard\/super/, /^\/dashboard/],
    customer: [
      /^\/dashboard\/feed$/,
      /^\/dashboard\/cars\/\d+$/,
      /^\/dashboard\/cars\/\d+\/reservation$/,
      /^\/dashboard\/verification$/,
      /^\/dashboard\/reservations$/,
      /^\/dashboard\/reservations\/\d+$/
    ]
  }
}

export const STATIC_URL = "http://localhost:9000/cars/"
export const DASHBOARD_PAGES = new DASHBOARD()