// server.ts

import 'reflect-metadata'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'

import { AppDataSource } from './data-source.js'
import bodyParser from 'body-parser'
import cors from 'cors'
import { typeDefs } from './schema.js'
import resolvers from './resolvers.js'

import dotenv from 'dotenv'

import { createServer } from 'http'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { WebSocketServer } from 'ws'
import { useServer } from 'graphql-ws/lib/use/ws'

import express from 'express'

// Load environment variables from .env file
dotenv.config()

await AppDataSource.initialize()

const schema = makeExecutableSchema({ typeDefs, resolvers })

// Create an Express app and HTTP server; we will attach the WebSocket
// server and the ApolloServer to this HTTP server.
const app = express()
// for cross origin
app.use(cors())

const httpServer = createServer(app)
// Creating the WebSocket server
const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql'
})

// Hand in the schema we just created and have the
// WebSocketServer start listening.
const serverCleanup = useServer({ schema }, wsServer)

const server = new ApolloServer({
  schema,
  plugins: [
    // Proper shutdown for the HTTP server.
    ApolloServerPluginDrainHttpServer({ httpServer }),

    // Proper shutdown for the WebSocket server.
    {
      async serverWillStart () {
        return {
          async drainServer () {
            await serverCleanup.dispose()
          }
        }
      }
    }
  ]
})

await server.start()
app.use('/graphql', bodyParser.json(), expressMiddleware(server))

const PORT = 8080
// Now that our HTTP server is fully set up, we can listen to it.
httpServer.listen(PORT, () => {
  console.log(`Server is now running on http://localhost:${PORT}/graphql`)
})
