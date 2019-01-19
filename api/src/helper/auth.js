const jwt = require('jsonwebtoken');
const { authSecret } = require('../config');

function createAuthToken(data) {
  return jwt.sign(data, authSecret, { expiresIn: '30 days' });
}

function verifyAuthToken(authorization) {
  let payload;

  if (!authorization || !(authorization.indexOf('Bearer ') === 0)) {
    const e = new Error('INVALID_TOKEN')
    e.status = 401
    throw e;
  }

  var token = authorization.split(' ')[1]
  if (!token) {
    const e = new Error('INVALID_TOKEN')
    e.status = 401
    throw e;
  }

  try {
    payload = jwt.verify(token, authSecret);
  } catch (err) {
    const e = new Error('INVALID_TOKEN')
    e.status = 401
    throw e;
  }

  const { expiredAt } = payload;
  if (expiredAt < new Date().getTime()) {
    const e = new Error('TOKEN_EXPIRED')
    e.status = 401
    throw e;
  }

  if (payload && payload.id) {
    return payload;
  } else {
    const e = new Error('INVALID_TOKEN_PAYLOAD')
    e.status = 401
    throw e;
  }
}

module.exports = {
  createAuthToken,
  verifyAuthToken
};
