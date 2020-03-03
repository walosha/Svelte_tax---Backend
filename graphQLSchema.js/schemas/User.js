const { composeWithMongoose } = require('graphql-compose-mongoose/node8');
const User = require('../../models/userModel');
const accessToken = require('../../utils/adminAccess');

const customizationOptions = {};
const UserTC = composeWithMongoose(User, customizationOptions);

exports.UserQuery = {
  ...accessToken({
    userById: UserTC.getResolver('findById'),
    userByIds: UserTC.getResolver('findByIds'),
    userOne: UserTC.getResolver('findOne'),
    userMany: UserTC.getResolver('findMany'),
    userCount: UserTC.getResolver('count'),
    userConnection: UserTC.getResolver('connection'),
    userPagination: UserTC.getResolver('pagination')
  })
};

exports.UserMutation = {
  userCreateOne: UserTC.getResolver('createOne'),
  ...accessToken({
    userCreateMany: UserTC.getResolver('createMany'),
    userUpdateById: UserTC.getResolver('updateById'),
    userUpdateOne: UserTC.getResolver('updateOne'),
    userUpdateMany: UserTC.getResolver('updateMany'),
    userRemoveById: UserTC.getResolver('removeById'),
    userRemoveOne: UserTC.getResolver('removeOne'),
    userRemoveMany: UserTC.getResolver('removeMany')
  })
};
