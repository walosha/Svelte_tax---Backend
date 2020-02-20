const { GraphQLServer } = require('graphql-yoga');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
// const Query = require('./graphQL/resolvers/Query');
// const Mutation = require('./graphQL/resolvers/Mutation');
const graphqlSchema = require('./graphQLSchema.js');

dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connection successful!'))
  .catch(e => console.log('Error-', e));

// const resolvers = {
//   Query,
//   Mutation
// };

const server = new GraphQLServer({
  schema: graphqlSchema
});

mongoose.connection.once('open', function() {
  server.start(() => console.log('Server is running on localhost:4000'));
});
