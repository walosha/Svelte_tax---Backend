const User = require('../../models/userModel');

const Mutation = {
  addUser: async (_, { fullname, username, phoneNumber, city }) => {
    const user = new User({ fullname, username, phoneNumber, city });
    await user.save();
    return user;
  },

  deleteUser: async (_, { id }) => {
    await User.findByIdAndRemove(id);
    return 'User deleted';
  }
};

module.exports = Mutation;
