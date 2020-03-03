module.exports = function accessToken(resolvers) {
  Object.keys(resolvers).forEach(k => {
    resolvers[k] = resolvers[k].wrapResolve(next => rp => {
      if (!rp.context.req) {
        throw new Error('You have no Access Token ');
      }
      return next(rp);
    });
  });
  return resolvers;
};
