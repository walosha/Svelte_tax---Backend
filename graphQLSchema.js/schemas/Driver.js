const { composeWithMongoose } = require('graphql-compose-mongoose/node8');
const Driver = require('../../models/driverModel');
const { accessToken } = require('../../controllers/authController');

const customizationOptions = {};
const DriverTC = composeWithMongoose(Driver, customizationOptions);

exports.DriverQuery = {
  ...accessToken({
    driverById: DriverTC.getResolver('findById'),
    driverByIds: DriverTC.getResolver('findByIds'),
    driverOne: DriverTC.getResolver('findOne'),
    driverMany: DriverTC.getResolver('findMany'),
    driverCount: DriverTC.getResolver('count'),
    driverConnection: DriverTC.getResolver('connection'),
    driverPagination: DriverTC.getResolver('pagination')
  })
};

exports.DriverMutation = {
  ...accessToken({
    driverCreateOne: DriverTC.getResolver('createOne'),
    driverCreateMany: DriverTC.getResolver('createMany'),
    driverUpdateById: DriverTC.getResolver('updateById'),
    driverUpdateOne: DriverTC.getResolver('updateOne'),
    driverUpdateMany: DriverTC.getResolver('updateMany'),
    driverRemoveById: DriverTC.getResolver('removeById'),
    driverRemoveOne: DriverTC.getResolver('removeOne'),
    driverRemoveMany: DriverTC.getResolver('removeMany')
  })
};
