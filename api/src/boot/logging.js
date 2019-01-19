require('express-async-errors');

module.exports = function () {
  process.on('uncaughtException', (err) => {
    console.error("CAUGHT EXCEPTION", err);
  });

  process.on("unhandledRejection", (err) => {
    throw err;
  });
}
