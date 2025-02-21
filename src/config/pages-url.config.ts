class DASHBOARD {
  private root = '/dashboard'

  private businessRoot = '/business'
  private superRoot = '/super'
  private clientRoot = '/client'

  AUTH = `/auth`

  BUSINESS_CARS = `${this.root}${this.businessRoot}/cars`
  CAR_DETAILS = `${this.BUSINESS_CARS}/[id]`
  CREATE = `${this.root}${this.businessRoot}/create`
  RESERVATIONS = `${this.root}${this.businessRoot}/reservations`

  FEED = `${this.clientRoot}/feed`
  VERIFICATION = `${this.clientRoot}/verification`

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

class CLIENT {
  private root = '/client'
  RESERVATIONS = `${this.root}/reservations`
  FEED = `${this.root}/feed`
  VERIFICATION = `${this.root}/verification`
}

export const CLIENT_PAGES = new CLIENT()
