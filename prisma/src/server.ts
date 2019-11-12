import { GraphQLServer } from 'graphql-yoga'

import { createContext } from './context'
import { schema } from './schema'
import { permissions } from './permissions'

const server = new GraphQLServer({
  schema,
  context: createContext,
  middlewares: [permissions]
})

server.start(
  {
    playground: process.env.NODE_ENV === 'production' ? false : '/'
  },
  () => console.log('🚀 Server ready at http://localhost:4000')
)
