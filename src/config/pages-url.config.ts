class DASHBOARD {
  private root = '/dashboard'

  private businessRoot = '/business'
  private superRoot = '/super'

  AUTH = `/auth`
  BUSINESS_CARS = `${this.root}${this.businessRoot}/cars`
  CREATE = `${this.root}${this.businessRoot}/create`
  CARS_RESERVATIONS = `${this.root}${this.businessRoot}/reservations`
  CAR_DETAILS = `${this.BUSINESS_CARS}/[id]`
  CUSTOMER_FEED = `${this.root}/feed`
  SUPER_BUSINESS = `${this.root}${this.superRoot}/businesses`

  ACCESS_URL: Record<'worker' | 'admin' | 'customer' | 'superuser', string[]> = {
    'worker': ['/business/*'],
    'admin': ['/business/*'],
    'customer': ['/feed', '/cars/:id', '/сars/:id/reservation', '/verification', '/reservations', '/reservations/:id'],
    'superuser': ['/super/*']
  }
}

export const STATIC_URL = "http://localhost:9000/cars/"
export const DASHBOARD_PAGES = new DASHBOARD()
