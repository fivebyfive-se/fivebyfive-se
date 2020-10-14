const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();

if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1); // trust first proxy
}

module.exports = app
    .use(bodyParser.json({ type: '*/json' }))
    .use('/', routes)
;