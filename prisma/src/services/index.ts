export interface Param {
  name: string
  type: string
}

export interface Widget {
  name: string
  description: string
  requestUrl: string
  authRequired: boolean
  params: Param[]
}

export interface Service {
  name: string
  widgets: Widget[]
}

const services: Service[] = require('./services')['services']

export default services
