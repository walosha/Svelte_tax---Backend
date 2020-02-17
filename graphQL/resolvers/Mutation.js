const User = require('../../models/userModel');
const Driver = require('../../models/driverModel');

const Mutation = {
  addUser: async (_, { fullname, username, phoneNumber, city }) => {
    const user = new User({ fullname, username, phoneNumber, city });
    await user.save();
    return user;
  },

  deleteUser: async (_, { id }) => {
    await User.findByIdAndRemove(id);
    return 'User deleted';
  },
  addDriver: async (
    parent,
    {
      fullname,
      username,
      driverImage,
      driverAge,
      phoneNumber,
      vehicleNumber,
      vehicleType,
      vehicleModel,
      city
    }
  ) => {
    const driver = new User({
      fullname,
      username,
      driverImage,
      driverAge,
      phoneNumber,
      vehicleNumber,
      vehicleType,
      vehicleModel,
      city
    });
    await driver.save();
    return driver;
  },

  deleteDriver: async (parent, { id }) => {
    await Driver.findByIdAndRemove(id);
    return 'Driver deleted';
  }
};

module.exports = Mutation;
