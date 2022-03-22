const express = require('express');

const ensureHttps = require('@lib/middleware/ensure-https');
const parseFivebyfive = require('@lib/middleware/parse-fivebyfive');

const router = express.Router();

router
    .use(ensureHttps)
    .use(parseFivebyfive)

    .get('/', async (req, res) => res.render('index'))
    // .get('/', async (req, res) => res.render('index'))

    .get('/l/:lang', (req, res) => {
        res.cookie('language', req.params.lang, { maxAge: 900000, httpOnly: true });
        res.redirect(req.header('Referer') || '/');
    })
;

module.exports = router;
 