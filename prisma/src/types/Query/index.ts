import { queryType } from 'nexus'

export const DefaultQueries = queryType({
  definition (t) {
    t.crud.widget()
    t.crud.widgets({ ordering: { name: true }, filtering: true })
  }
})

export * from './User'
export * from './Widget'
