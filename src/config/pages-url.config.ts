export const STATIC_URL = "http://localhost:9000/cars/"

class DASHBOARD {
  private root = '/dashboard'
  private businessRoot = '/business'
  private superRoot = '/super'

  AUTH = `/auth`
  
  BUSINESS_CARS = `${this.root}${this.businessRoot}/cars`
  CAR_DETAILS = `${this.BUSINESS_CARS}/[id]`
  CREATE = `${this.root}${this.businessRoot}/create`
  RESERVATIONS = `${this.root}${this.businessRoot}/reservations`
  
  SUPER_BUSINESS = `${this.root}${this.superRoot}/businesses`
  SUPER_KYC = `${this.root}${this.superRoot}/verifications`
}

class CLIENT {
  private root = '/client'
  RESERVATIONS = `${this.root}/reservations`
  FEED = `${this.root}/feed`
  VERIFICATION = `${this.root}/verification`
}

export const DASHBOARD_PAGES = new DASHBOARD()
export const CLIENT_PAGES = new CLIENT()
