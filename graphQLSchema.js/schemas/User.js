const { composeWithMongoose } = require('graphql-compose-mongoose/node8');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/userModel');
const accessToken = require('../../utils/adminAccess');

const customizationOptions = {};
const UserTC = composeWithMongoose(User, customizationOptions);

UserTC.addResolver({
  kind: 'mutation',
  name: 'login',
  args: {
    email: 'String!',
    password: 'String!'
  },
  type: UserTC.getResolver('updateById').getType(),

  resolve: async ({ args, context: { model, req } }) => {
    let user = null;
    console.log(args);
    console.log(model.userModel());
    console.log(req);

    user = await User.findOne({ email: args.email });

    console.log('User---', User);

    if (!user) {
      throw new Error('User does not exist.');
    }
    const isEqual = await bcrypt.compare(args.password, user.password);
    if (!isEqual) {
      throw new Error('Password is not correct.');
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_COOKIE_EXPIRES_IN
    });
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
  ...accessToken({
    userCreateMany: UserTC.getResolver('createMany'),
    userUpdateById: UserTC.getResolver('updateById'),
    userUpdateOne: UserTC.getResolver('updateOne'),
    userUpdateMany: UserTC.getResolver('updateMany'),
    userRemoveById: UserTC.getResolver('removeById'),
    userRemoveOne: UserTC.getResolver('removeOne'),
    userRemoveMany: UserTC.getResolver('removeMany'),
    UserLogin: UserTC.getResolver('login')
  })
};
