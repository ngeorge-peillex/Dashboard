import { rule, shield } from 'graphql-shield'
import { getUserId } from '../utils/getUserId'

const rules = {
  isAuthenticatedUser: rule()((parent, args, context) => {
    const userId = getUserId(context)

    return Boolean(userId)
  }),
  isCurrentUser: rule()(async (parent, args, context) => {
    const userId = getUserId(context)
    const user = await context.photon.users.findOne({
      where: {
        id: args.where.id
      }
    })
    return userId === user.id
  })
}

export const permissions = shield({
  Query: {
    user: rules.isAuthenticatedUser,
    users: rules.isAuthenticatedUser,
    me: rules.isAuthenticatedUser
  },
  Mutation: {
    updateOneUser: rules.isCurrentUser,
    deleteOneUser: rules.isCurrentUser
  }
})
