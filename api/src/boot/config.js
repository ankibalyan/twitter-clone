module.exports = function () {
  if (process.env.NODE_ENV === undefined) {
    throw new Error('PLEASE SET NODE_ENV ENV VARIABLE');
  }

  if (process.env.NODE_LOG === undefined) {
    throw new Error('PLEASE SET NODE_LOG ENV VARIABLE');
  }
}
