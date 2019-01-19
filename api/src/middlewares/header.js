function headerMiddleware(req, res, next) {
  console.log('`client input params', req.query, req.body);
  next();
}

module.exports = headerMiddleware;
