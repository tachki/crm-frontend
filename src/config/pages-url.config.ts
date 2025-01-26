class DASHBOARD {
  private root = '/dashboard'

  private businessRoot = '/business'

  AUTH = `/auth`
  BUSINESS_CARS = `${this.root}${this.businessRoot}/home`
  CREATE = `${this.root}${this.businessRoot}/cars/create`
  CAR_DETAILS = `${this.root}${this.businessRoot}/cars/:id`
}

export const DASHBOARD_PAGES = new DASHBOARD()