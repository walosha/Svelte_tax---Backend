const { composeWithMongoose } = require('graphql-compose-mongoose/node8');
const { signToken } = require('../../controllers/authController');
const User = require('../../models/userModel');
const { accessToken } = require('../../controllers/authController');
const AppError = require('../../utils/appError');

const customizationOptions = {};
const UserTC = composeWithMongoose(User, customizationOptions);

// ADDED TOKEN GRAPHQL SCHEMA
UserTC.addFields({
  token: {
    type: 'String',
    description: 'Token of authenticated user.'
  }
});

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
    const { email, password } = args;
    // 1) Check if email and password exist
    if (!email || !password) {
      return new AppError('Please provide email and password!', 400);
    }
    let user = null;

    user = await userModel.findOne({ email: email }).select('+password');

    if (!user) {
      throw new Error('User does not exist.');
    }
    const isEqual = await user.validatePassword(password, user.password);
    if (!isEqual) {
      throw new Error('Password is not correct.');
    }
    const token = signToken(user.id);

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
