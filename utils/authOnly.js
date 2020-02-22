module.exports = resolvers => {
  Object.keys(resolvers).forEach(k => {
    resolvers[k] = resolvers[k].wrapResolve(next => async rp => {
      if (!rp.context.req.isAuth) {
        throw new Error('You must login to view this.');
      }
      return next(rp);
    });
  });
  return resolvers;
};
