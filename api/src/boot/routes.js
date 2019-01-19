const express = require('express');
const trimmer = require('express-trimmer');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

// middlewares
const headersHandler = require('../middlewares/header');
const notFoundHandler = require('../middlewares/notFound');
const errorHandler = require('../middlewares/error');
const authMiddleware = require('../middlewares/auth');

// routes
const auth = require('../routes/auth');
const user = require('../routes/user');
const tweet = require('../routes/tweet');

function sendOk(req, res) {
    return res.send('OK');
}

module.exports = function(app) {
    app.use(
        cors(),
        helmet(),
        express.json({ limit: '2mb', extended: true }),
        express.urlencoded({ limit: '2mb', extended: true }),
        morgan('tiny'),
        trimmer,
        headersHandler
    );

    app.get('/', sendOk);
    app.use('/auth', auth);

    app.use(authMiddleware);

    app.use('/user', user);
    app.use('/tweet', tweet);

    app.use(notFoundHandler);
    app.use(errorHandler);
};
