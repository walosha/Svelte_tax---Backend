const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization.replace('Bearer', '');

  if (!token || token === '') {
    req.isAuth = false;
    return next();
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log('token', decodedToken);
  } catch (err) {
    req.isAuth = false;
    return next();
  }
  req.isAuth = true;
  req.appRoles = decodedToken.appRoles;
  req.userId = decodedToken.userId;
  next();
};
