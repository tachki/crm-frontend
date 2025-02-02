class DASHBOARD {
  private root = '/dashboard'

  private businessRoot = '/business'

  AUTH = `/auth`
  BUSINESS_CARS = `${this.root}${this.businessRoot}/cars`
  CREATE = `${this.root}${this.businessRoot}/create`
  UPDATE = `${this.root}${this.businessRoot}/cars/[id]/update`
}

export const DASHBOARD_PAGES = new DASHBOARD()