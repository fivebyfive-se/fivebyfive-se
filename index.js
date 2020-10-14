require('module-alias/register');

const express = require('express');
const vhost = require('vhost');

const kallesurf_app = require('@vhosts/kalle-surf');
const fivebyfive_app = require('@vhosts/fivebyfive-se');
const api_app = require('@vhosts/api-fivebyfive-se');

const port = process.env.PORT || 3000;

express()
    .use(vhost(/api\.fivebyfive\.local|api\.fivebyfive\.se/, api_app))
    .use(vhost(/fivebyfive\.local|www\.fivebyfive\.se|www\.5x5\.agency/, fivebyfive_app))
    .use(vhost(/kallesurf\.local|\.kalle\.surf/, kallesurf_app))
    

    .listen(port, () => {
        console.log(`Listening on ${port}`);
    });
