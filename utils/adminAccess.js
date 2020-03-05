const AppError = require('./appError');

module.exports = function accessToken(resolvers) {
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
