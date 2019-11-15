import { objectType } from 'nexus'

export const WidgetData = objectType({
  name: 'WidgetData',
  definition (t) {
    t.string('data', { nullable: true })
  }
})

export const Widget = objectType({
  name: 'Widget',
  definition (t) {
    t.model.id()
    t.model.name()
    t.model.isVisible()
    t.model.isConnected()
    t.string('data')
  }
})
