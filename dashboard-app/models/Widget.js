import about from '../services/about'
import {
  fetchOneWidget,
  updateWidget,
  fetchWidgetData,
} from '../services/widget'

export class Widget {
  id = ''
  data = ''
  refreshRate = 0

  constructor(args) {
    this.service = args.service
    this.name = args.name
    this.description = args.description
    this.authRequired = args.authRequired
    this.params = args.params

    this.isVisible = this.authRequired ? false : true
    this.isConnected = this.authRequired ? false : true
  }

  async update(params, fetch) {
    let newData
    if (fetch) {
      newData = await fetchOneWidget(this.name)
    } else {
      newData = await updateWidget({ ...params, id: this.id })
    }

    if (!newData || newData == {}) return
    this.id = newData.id
    this.isVisible = newData.isVisible
    this.isConnected = newData.isConnected
  }

  async fetchData(params, accessToken) {
    this.data = await fetchWidgetData(this.name, params, accessToken)
    return this.data
  }
}

const widgets = (async () => {
  let services = (await about())['server']['services']
  let widgets = []
  for (let service of Object.values(services)) {
    for (let widget of service.widgets) {
      widgets.push(new Widget({ service: service.name, ...widget }))
      widgets[widgets.length - 1].update({}, true)
    }
  }

  return widgets
})()

export default widgets
