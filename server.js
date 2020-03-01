const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const graphqlSchema = require('./graphQLSchema.js');
const isAuth = require('./utils/isAuth');

const app = express();

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

const server = new ApolloServer({
  schema: graphqlSchema,
  cors: true,
  playground: true,
  introspection: true,
  tracing: true,
  path: '/',
  context: ({ req }) => {
    //.log('Serverjs', req.req.headers.authorization);
    return req.headers.authorization;
  }
});

app.use('/', isAuth);

server.applyMiddleware({
  app,
  path: '/',
  cors: true,
  onHealthCheck: () => {
    return Promise((resolve, reject) => {
      if (mongoose.connection.readyState > 0) {
        resolve();
      } else {
        reject();
      }
    });
  }
});
mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connection successful!'))
  .catch(e => console.log('Error-', e));

app.listen({ port: process.env.PORT }, () => {
  console.log(process.env.PORT);
  console.log(`🚀 Server listening on port ${process.env.PORT}`);
  console.log(`😷 Health checks available at ${process.env.HEALTH_ENDPOINT}`);
});
