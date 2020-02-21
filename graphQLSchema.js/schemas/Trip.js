const { composeWithMongoose } = require('graphql-compose-mongoose/node8');
const Trip = require('../../models/tripModel');

const customizationOptions = {};
const TripTC = composeWithMongoose(Trip, customizationOptions);

exports.TripQuery = {
  tripById: TripTC.getResolver('findById'),
  tripByIds: TripTC.getResolver('findByIds'),
  tripOne: TripTC.getResolver('findOne'),
  tripMany: TripTC.getResolver('findMany'),
  tripCount: TripTC.getResolver('count'),
  tripConnection: TripTC.getResolver('connection'),
  tripPagination: TripTC.getResolver('pagination')
};

exports.TripMutation = {
  tripCreateOne: TripTC.getResolver('createOne'),
  tripCreateMany: TripTC.getResolver('createMany'),
  tripUpdateById: TripTC.getResolver('updateById'),
  tripUpdateOne: TripTC.getResolver('updateOne'),
  tripUpdateMany: TripTC.getResolver('updateMany'),
  tripRemoveById: TripTC.getResolver('removeById'),
  tripRemoveOne: TripTC.getResolver('removeOne'),
  tripRemoveMany: TripTC.getResolver('removeMany')
};
