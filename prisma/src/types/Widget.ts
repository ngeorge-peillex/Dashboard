import { objectType } from 'nexus'

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
