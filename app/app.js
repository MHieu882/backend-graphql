require('dotenv').config();
const mongoose = require('mongoose');
const { expressMiddleware } = require('@apollo/server/express4');
const { ApolloServer } = require('@apollo/server');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const session = require('express-session');
const ConnectRedis = require('connect-redis');
const express = require('express');
const cors = require('cors');
const http = require('http');
const config = require('./configs');
const logger = require('./utils/logger');
const typeDefs = require('./graphql/schema/typeDefs');
const resolvers = require('./graphql/resolver/index');

async function startApolloServer() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  // mongodb
  mongoose.set('strictQuery', false);
  mongoose.connect(config.mongodb.connectionString, config.mongodb.mongoDbOptions)
    .then(() => {
      logger.info('Hello from Mongodb');
    })
    .catch(error => {
      logger.error('Connect to mongodb failed', error);
    });

  const RedisStore = ConnectRedis(session);
  app.use(session({
    store: new RedisStore({ client: config.clientRedis }),
    secret: '123as@!#',
    saveUninitialized: false,
    cookie: { secure: false,
      httpOnly: true,
      maxAge: 12412432 },
    resave: false,
  }));
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  app.use(express.json());
  app.use(cors());
  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: ({ req, res }) => ({ req, res }),
    }),
  );

  // eslint-disable-next-line no-promise-executor-return
  await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
  logger.info('🚀 Server ready at http://localhost:4000/graphql');
}
startApolloServer();
module.exports = startApolloServer;
