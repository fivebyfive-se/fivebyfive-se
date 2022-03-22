const express = require('express');

const ensureHttps = require('@lib/middleware/ensure-https');
const themeCookie = require('@lib/middleware/theme-cookie');

const router = express.Router();

router
    .use(ensureHttps)
    .use(themeCookie)

    .get('/', (req, res) => res.render('page', {
        page: {
            lang: req.language,
            theme: req.theme,
            title: 'Fivebyfive AB',
            heading: 'Welcome to Fivebyfive AB',
            intro: 'We love designing and developing for the web. We also love illustration and animation.'
        },
        site: {
            description: ''
        }
    }))

    .get('/languages/:lang', (req, res) => {
        res.cookie('language', req.params.lang, { maxAge: 900000, httpOnly: true });
        res.redirect(req.header('Referer') || '/');
    })

    .get('/themes/:name', (req, res) => {
        res.cookie('theme', req.params.name, { maxAge: 900000, httpOnly: true });
        res.redirect(req.header('Referer') || '/');
    })
;

module.exports = router;
 