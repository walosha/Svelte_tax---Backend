const { composeWithMongoose } = require('graphql-compose-mongoose/node8');
const Vehicle = require('../../models/vehicleModel');

const customizationOptions = {};
const VehicleTC = composeWithMongoose(Vehicle, customizationOptions);

exports.VehicleQuery = {
  vehicleTCById: VehicleTC.getResolver('findById'),
  vehicleTCByIds: VehicleTC.getResolver('findByIds'),
  vehicleTCOne: VehicleTC.getResolver('findOne'),
  vehicleTCMany: VehicleTC.getResolver('findMany'),
  vehicleTCCount: VehicleTC.getResolver('count'),
  vehicleTCConnection: VehicleTC.getResolver('connection'),
  vehicleTCPagination: VehicleTC.getResolver('pagination')
};
exports.VehicleMutation = {
  vehicleTCCreateOne: VehicleTC.getResolver('createOne'),
  vehicleTCCreateMany: VehicleTC.getResolver('createMany'),
  vehicleTCUpdateById: VehicleTC.getResolver('updateById'),
  vehicleTCUpdateOne: VehicleTC.getResolver('updateOne'),
  vehicleTCUpdateMany: VehicleTC.getResolver('updateMany'),
  vehicleTCRemoveById: VehicleTC.getResolver('removeById'),
  vehicleTCRemoveOne: VehicleTC.getResolver('removeOne'),
  vehicleTCRemoveMany: VehicleTC.getResolver('removeMany')
};
