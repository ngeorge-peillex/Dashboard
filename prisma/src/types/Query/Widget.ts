import { queryField, inputObjectType } from 'nexus'
import axios from 'axios'
import format from 'string-template'

import { getUserId } from '../../utils/getUserId'
import camelize from '../../utils/camelize'
import services, { Widget } from '../../services'

// Generate the arguments for the widgetService resolver.
// They will be formatted like this:
// {
//      <widgetName>: {
//          <paramName> (of type specified in services.json)
//      }
// }
const widgetArgs = (() => {
  let widgets = {}
  // Iterate of services
  for (let service of Object.values(services)) {
    // Iterate over widgets in a service
    for (let widget of service.widgets) {
      // Create an object type for each widget. Those will be used to supply request params.
      const widgetParamType = inputObjectType({
        name: camelize(widget.name),
        definition(t) {
          // Iterate over parameters of a widget
          for (let param of widget.params) {
            if (param.type == 'integer') {
              t.int(camelize(param.name))
            } else if (param.type == 'string') {
              t.string(camelize(param.name))
            }
            if (widget.authRequired) {
              t.string('accessToken')
            }
          }
        },
      })
      widgets[camelize(widget.name)] = widgetParamType
    }
  }
  return widgets
})()

export const fetchWidgetData = queryField('fetchWidgetData', {
  type: 'WidgetData',
  args: widgetArgs,
  resolve: async (parent, args, ctx) => {
    const userId = getUserId(ctx)
    const user = await ctx.photon.users.findOne({
      where: {
        id: userId,
      },
    })

    for (let [key, value] of Object.entries(args)) {
      if (!value) continue

      let widget: Widget | undefined = (() => {
        for (let service of Object.values(services)) {
          for (let widget of service.widgets) {
            if (camelize(widget.name) == key) return widget
          }
        }
      })()
      if (!widget) continue

      let requestUrl: string = format(widget.requestUrl, {
        ...value,
        ...user,
        ...process.env,
      })

      let res = await axios.get(requestUrl, {
        ...(widget.authRequired
          ? { headers: { Authorization: 'Bearer ' + value.accessToken } }
          : {}),
        responseType: 'text',
      })
      if (res) {
        return { data: JSON.stringify(res.data) }
      }
    }
    return {}
  },
})
