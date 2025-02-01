class DASHBOARD {
  private root = '/dashboard'

  private businessRoot = '/business'

  AUTH = `/auth`
  BUSINESS_CARS = `${this.root}${this.businessRoot}/cars`
  CREATE = `${this.root}${this.businessRoot}/create`
}

export const DASHBOARD_PAGES = new DASHBOARD()