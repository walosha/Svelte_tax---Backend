const User = require('../../models/userModel');
const Driver = require('../../models/driverModel');

const Mutation = {
  createUser: async (_, { fullname, username, phoneNumber, city }) => {
    const user = new User({ fullname, username, phoneNumber, city });
    await user.save();
    return user;
  },

  deleteUser: async (_, { id }) => {
    await User.findByIdAndRemove(id);
    return 'User deleted';
  },
  createDriver: async (
    parent,
    {
      firstName,
      lastName,
      staffId,
      driverImage,
      driverAge,
      phoneNumber,
      vehicleNumber,
      city
    }
  ) => {
    const driver = new Driver({
      firstName,
      lastName,
      staffId,
      driverImage,
      driverAge,
      phoneNumber,
      vehicleNumber,
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
