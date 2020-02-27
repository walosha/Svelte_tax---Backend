module.exports = function adminAccess(resolvers) {
  Object.keys(resolvers).forEach(k => {
    resolvers[k] = resolvers[k].wrapResolve(next => rp => {
      console.log('context', rp);
      if (!rp.context.admin) {
        throw new Error('You should be admin, to have access to this action.');
      }
      return next(rp);
    });
  });
  return resolvers;
};
