const { schemaComposer } = require('graphql-compose');
const { UserQuery, UserMutation } = require('./schemas/User');
const { VehicleQuery, VehicleMutation } = require('./schemas/Vehicle');
const { CustomerQuery, CustomerMutation } = require('./schemas/Customer');
const { DriverQuery, DriverMutation } = require('./schemas/Driver');
const { TripQuery, TripMutation } = require('./schemas/Trip');
const { SupportQuery, SupportMutation } = require('./schemas/Support');

schemaComposer.Query.addFields({
  ...UserQuery,
  ...VehicleQuery,
  ...CustomerQuery,
  ...DriverQuery,
  ...TripQuery,
  ...SupportQuery
});

schemaComposer.Mutation.addFields({
  ...UserMutation,
  ...VehicleMutation,
  ...CustomerMutation,
  ...DriverMutation,
  ...TripMutation,
  ...SupportMutation
});

module.exports = schemaComposer.buildSchema();
