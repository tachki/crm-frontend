class DASHBOARD {
  private root = '/dashboard'

  private businessRoot = '/business'

  AUTH = `/auth`
  BUSINESS_CARS = `${this.root}${this.businessRoot}/cars`
  CREATE = `${this.root}${this.businessRoot}/create`
  CAR_DETAILS = `${this.BUSINESS_CARS}/[id]`


  private clientRoot = '/client'

  FEED = `${this.clientRoot}/feed`
  VERIFICATION = `${this.clientRoot}/verification`

  RESERVATIONS = `${this.clientRoot}/reservations`
  RESERVATION_DETAIL = `${this.RESERVATIONS}/[id]`

  CARS_ROOT = `${this.clientRoot}/cars`
  CAR_PAGE =  `${this.CARS_ROOT}/[id]`
  CAR_PAGE_RESERVATION = `${this.CAR_PAGE}/reservation`
}

export const STATIC_URL = "http://localhost:9000/cars/"

export const DASHBOARD_PAGES = new DASHBOARD()
