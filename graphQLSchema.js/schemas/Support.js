const { composeWithMongoose } = require('graphql-compose-mongoose/node8');
const Support = require('../../models/supportModel');
const { accessToken } = require('../../controllers/authController');

const customizationOptions = {};
const SupportTC = composeWithMongoose(Support, customizationOptions);

exports.SupportQuery = {
  ...accessToken({
    supportById: SupportTC.getResolver('findById'),
    supportByIds: SupportTC.getResolver('findByIds'),
    supportOne: SupportTC.getResolver('findOne'),
    supportMany: SupportTC.getResolver('findMany'),
    supportCount: SupportTC.getResolver('count'),
    supportConnection: SupportTC.getResolver('connection'),
    supportPagination: SupportTC.getResolver('pagination')
  })
};

exports.SupportMutation = {
  ...accessToken({
    supportCreateOne: SupportTC.getResolver('createOne'),
    supportCreateMany: SupportTC.getResolver('createMany'),
    supportUpdateById: SupportTC.getResolver('updateById'),
    supportUpdateOne: SupportTC.getResolver('updateOne'),
    supportUpdateMany: SupportTC.getResolver('updateMany'),
    supportRemoveById: SupportTC.getResolver('removeById'),
    supportRemoveOne: SupportTC.getResolver('removeOne'),
    supportRemoveMany: SupportTC.getResolver('removeMany')
  })
};
