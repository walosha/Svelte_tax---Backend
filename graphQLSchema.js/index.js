const { schemaComposer } = require('graphql-compose');
const { UserQuery, UserMutation } = require('./schemas/User');
const { VehicleQuery, VehicleMutation } = require('./schemas/Vehicle');

schemaComposer.Query.addFields({
  ...UserQuery,
  ...VehicleQuery
});

schemaComposer.Mutation.addFields({
  ...UserMutation,
  ...VehicleMutation
});

const graphqlSchema = schemaComposer.buildSchema();
module.exports = graphqlSchema;
