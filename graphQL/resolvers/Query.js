const User = require('../../models/userModel');

const Query = {
  getUsers: () => User.find(),
  getUser: async (_, { id }) => {
    const result = await User.findById(id);
    return result;
  }
};
module.exports = Query;
