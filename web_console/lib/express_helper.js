
/**
 * set remote address in session
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.setRemoteAdress = function(req, res, next) {
  // console.log(req.session);
  res.locals.session = req.session;
  if (!req.session.remoteAdress) {
    req.session.remoteAdress = (req.headers['x-forwarded-for'] ||
      // req.ip ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress).split(",")[0];
  }
  next();
};