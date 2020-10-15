const express = require('express');
const Redis = require('ioredis');

const cache = require('express-redis-cache')({
    client: new Redis(process.env.REDIS_URL),
    prefix: 'kalle.surf',
    expire: 60 * 60 * 24 * 7 // 1 week
});
const cache_Name = (...parts) => (req, res, next) => {
    res.express_redis_cache_name = [...parts, req.language].filter((p) => !!p).join('/');
    next();
};

const ensureHttps = require('@lib/middleware/ensure-https');
const parseFivebyfive = require('@lib/middleware/parse-fivebyfive');

const router = express.Router();

router
    .use(ensureHttps)
    .use(parseFivebyfive)

    .get('/', cache_Name('start'), cache.route(), async (req, res) => res.render('index'))
    // .get('/', async (req, res) => res.render('index'))

    .get('/l/:lang', (req, res) => {
        res.cookie('language', req.params.lang, { maxAge: 900000, httpOnly: true });
        res.redirect(req.header('Referer') || '/');
    })
;

module.exports = router;
 