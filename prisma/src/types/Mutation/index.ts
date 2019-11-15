import { mutationType } from 'nexus'

export const DefaultMutations = mutationType({
  definition (t) {
    t.crud.updateOneUser()
    t.crud.deleteOneUser()

    t.crud.createOneWidget()
    t.crud.updateOneWidget()
    t.crud.upsertOneWidget()
    t.crud.deleteOneWidget()
    t.crud.updateManyWidget()
    t.crud.deleteManyWidget()
  }
})

export * from './User'
