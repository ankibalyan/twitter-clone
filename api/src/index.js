const dotenv = require('dotenv').config();
const express = require('express');

const app = express();
app.disable('x-powered-by');

require('./boot/logging')();
require('./boot/config')();
require('./boot/db')();
require('./boot/routes')(app)

const PORT = process.env.PORT || 6100;
app.listen(PORT, err => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Application start on port: ${PORT}`);
});

