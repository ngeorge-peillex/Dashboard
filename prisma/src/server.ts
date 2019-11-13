import { GraphQLServer } from 'graphql-yoga'

import { createContext } from './context'
import { schema } from './schema'
import { permissions } from './permissions'

const services = require('./services')

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

server.express.get('/about.json', function (req, res) {
  var about = {
    client: {
      host: 'localhost'
    },
    server: {
      current_time: Date.now(),
      services: services
    }
  }
  res.json(about)
})
