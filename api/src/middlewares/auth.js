const { verifyAuthToken } = require('../helper/auth');

function authMiddleware(req, res, next) {
  let payload;
  try {
    payload = verifyAuthToken(req.headers.authorization);
    res.locals.user = payload;
    res.locals.auth = true;
    console.log({ payload });
    return next();
  } catch (error) {
    // @TODO: add a valid token error message
    const e = new Error('INVALID_TOKEN');
    e.status = 401;
    throw e;
  }
}

module.exports = authMiddleware;
