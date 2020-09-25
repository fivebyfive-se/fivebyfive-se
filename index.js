const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');


const routes = require('./routes');

const port = process.env.PORT || 3000;

const app = express();

if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1); // trust first proxy
}

app
    .use(bodyParser.json({ type: '*/json' }))
    .use(express.static(path.join(__dirname, 'static')))

    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'pug')

    .use('/', routes)

    .listen(port, () => {
        console.log(`Listening on ${port}`);
    })
;