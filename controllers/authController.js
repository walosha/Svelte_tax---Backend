const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');

//Create Token
exports.signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

exports.getMe = async req => {
  const token =
    req.headers.authorization && req.headers.authorization.split(' ')[1];
  try {
    return await jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return null;
  }
};

exports.accessToken = function accessToken(resolvers) {
  Object.keys(resolvers).forEach(k => {
    resolvers[k] = resolvers[k].wrapResolve(next => rp => {
      if (!rp.context.req) {
        return new AppError('You have not logged In', 400);
      }
      return next(rp);
    });
  });
  return resolvers;
};
