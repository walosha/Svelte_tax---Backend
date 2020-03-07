const { composeWithMongoose } = require('graphql-compose-mongoose/node8');
const jwt = require('jsonwebtoken');
const User = require('../../models/userModel');
const accessToken = require('../../utils/adminAccess');

const customizationOptions = {};
const UserTC = composeWithMongoose(User, customizationOptions);

// ADDED TOKEN GRAPHQL SCHEMA
UserTC.addFields({
  token: {
    type: 'String',
    description: 'Token of authenticated user.'
  }
});

//CREATE TOKEN

const tokenSign = function(id) {
  return jwt.sign({ userId: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

//LOGIN MUTATTION

UserTC.addResolver({
  kind: 'mutation',
  name: 'login',
  args: {
    email: 'String!',
    password: 'String!'
  },
  type: UserTC.getResolver('updateById').getType(),

  resolve: async ({
    args,
    context: {
      model: { userModel }
    }
  }) => {
    let user = null;

    user = await userModel.findOne({ email: args.email }).select('+password');

    if (!user) {
      throw new Error('User does not exist.');
    }
    const isEqual = await user.validatePassword(args.password, user.password);
    if (!isEqual) {
      throw new Error('Password is not correct.');
    }
    const token = tokenSign(user.id);

    return {
      recordId: user._id,
      record: {
        email: user.email,
        token
      }
    };
  }
});

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
  UserLogin: UserTC.getResolver('login'),
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
