const User = require('../../models/userModel');
const Driver = require('../../models/driverModel');

const Query = {
  getUsers: () => User.find(),
  getUser: async (parent, { id }) => {
    const result = await User.findById(id);
    return result;
  },
  getDrivers: () => Driver.find(),
  getDriver: async (parent, { id }) => {
    const result = await Driver.findById(id);
    return result;
  }
};
module.exports = Query;
