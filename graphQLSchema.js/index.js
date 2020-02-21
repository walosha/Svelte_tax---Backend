const { schemaComposer } = require('graphql-compose');
const { UserQuery, UserMutation } = require('./schemas/User');
const { VehicleQuery, VehicleMutation } = require('./schemas/Vehicle');
const { CustomerQuery, CustomerMutation } = require('./schemas/Customer');
const { DriverQuery, DriverMutation } = require('./schemas/Driver');

schemaComposer.Query.addFields({
  ...UserQuery,
  ...VehicleQuery,
  ...CustomerQuery,
  ...DriverQuery
});

schemaComposer.Mutation.addFields({
  ...UserMutation,
  ...VehicleMutation,
  ...CustomerMutation,
  ...DriverMutation
});

module.exports = schemaComposer.buildSchema();
