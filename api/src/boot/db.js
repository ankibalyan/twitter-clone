const mongoose = require('mongoose');
const mongoDBUrl = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/twitter-db';

module.exports = function () {
  // mongoose.Promise = global.Promise;
  mongoose.connect(mongoDBUrl, { useNewUrlParser: true }).then(() => {
    console.info("MongoDB Connected");
  });
  mongoose.set('useCreateIndex', true)
}
