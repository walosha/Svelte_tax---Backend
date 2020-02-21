const { schemaComposer } = require('graphql-compose');
const { UserQuery, UserMutation } = require('./schemas/User');
const { VehicleQuery, VehicleMutation } = require('./schemas/Vehicle');
const { CustomerQuery, CustomerMutation } = require('./schemas/Customer');

schemaComposer.Query.addFields({
  ...UserQuery,
  ...VehicleQuery,
  ...CustomerQuery
});

schemaComposer.Mutation.addFields({
  ...UserMutation,
  ...VehicleMutation,
  ...CustomerMutation
});

module.exports = schemaComposer.buildSchema();
