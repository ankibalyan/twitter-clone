// catch 404 and forwarding to error handler
function notFound(req, res, next) {
  const err = new Error('NOT_FOUND')
  err.status = 404;
  next(err);
}

module.exports = notFound;
