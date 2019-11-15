import { queryField, inputObjectType } from 'nexus'
import axios from 'axios'
import format from 'string-template'

import { getUserId } from '../../utils/getUserId'

import services from '../../services'

function camelize(str: string) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
      return index == 0 ? word.toLowerCase() : word.toUpperCase()
    })
    .replace(/\s+/g, '')
}

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
  for (let value of Object.values(services)) {
    // Iterate over widgets in a service
    for (let widget of value.widgets) {
      // Create an object type for each widget. Those will be used to supply request params.
      const widgetParamType = inputObjectType({
        name: camelize(widget.name),
        definition(t) {
          // Iterate over parameters of a widget
          for (let param of widget.params) {
            if (param.type == 'int') {
              t.int(camelize(param.name))
            } else if (param.type == 'string') {
              t.string(camelize(param.name))
            }
          }
        },
      })
      widgets[camelize(widget.name)] = widgetParamType
    }
  }
  return widgets
})()

export const widgetService = queryField('widgetService', {
  type: 'Widget',
  args: widgetArgs,
  resolve: async (parent, args, ctx) => {
    const userId = getUserId(ctx)

    let responses = []
    for (let [key, value] of Object.entries(args)) {
      if (!value) continue
      let widget = await ctx.photon.widgets.findMany({
        where: {
          name: key,
          owner: { id: userId },
        },
      })
      console.log(widget)
      if (!widget || !widget[0]) continue
      widget = widget[0]
      console.log(widget)
      let requestUrl: string = format(widget.requestUrl, {
        ...value,
        ...process.env,
      })
      responses.push({ ...widget, data: await axios.get(requestUrl) })
    }
    return responses
  },
})
