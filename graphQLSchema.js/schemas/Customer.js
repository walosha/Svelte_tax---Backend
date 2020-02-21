const { composeWithMongoose } = require('graphql-compose-mongoose/node8');
const Customer = require('../../models/customerModel');

const customizationOptions = {};
const CustomerTC = composeWithMongoose(Customer, customizationOptions);

exports.CustomerQuery = {
  customerById: CustomerTC.getResolver('findById'),
  customerByIds: CustomerTC.getResolver('findByIds'),
  customerOne: CustomerTC.getResolver('findOne'),
  customerMany: CustomerTC.getResolver('findMany'),
  customerCount: CustomerTC.getResolver('count'),
  customerConnection: CustomerTC.getResolver('connection'),
  customerPagination: CustomerTC.getResolver('pagination')
};

exports.CustomerMutation = {
  customerCreateOne: CustomerTC.getResolver('createOne'),
  customerCreateMany: CustomerTC.getResolver('createMany'),
  customerUpdateById: CustomerTC.getResolver('updateById'),
  customerUpdateOne: CustomerTC.getResolver('updateOne'),
  customerUpdateMany: CustomerTC.getResolver('updateMany'),
  customerRemoveById: CustomerTC.getResolver('removeById'),
  customerRemoveOne: CustomerTC.getResolver('removeOne'),
  customerRemoveMany: CustomerTC.getResolver('removeMany')
};
