const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
//const morgan = require('morgan');
const graphqlSchema = require('./graphQLSchema.js');
const globaErrorHnadler = require('./controllers/errorController');
const { getMe } = require('./controllers/authController');
const model = require('./models');

const app = express();

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

app.use(cors());
//app.use(morgan('dev'));

const server = new ApolloServer({
  schema: graphqlSchema,
  cors: true,
  playground: true,
  introspection: true,
  tracing: true,
  path: '/',
  context: async ({ req }) => {
    const me = await getMe(req);
    return {
      req: me,
      model
    };
  }
});

server.applyMiddleware({
  app,
  path: '/graphql',
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

app.use(globaErrorHnadler);
