const express = require('express');
const Redis = require('ioredis');

const ensureHttps = require('@lib/middleware/ensure-https');
const injectPrismic = require('@lib/middleware/inject-prismic');
const initPrismicApi = require('@lib/middleware/init-prismic-api');
const themeCookie = require('@lib/middleware/theme-cookie');

const cache = require('express-redis-cache')({
    client: new Redis(process.env.REDIS_URL),
    prefix: 'fivebyfive.se',
    expire: 60 * 60 * 24 * 7 // 1 week
});

const router = express.Router();

const cache_Name = (...parts) => (req, res, next) => {
    const lang = req.lang || req.language || (req.getLocale ? req.getLocale() : null);
    res.express_redis_cache_name = [...parts, req.params.uid, lang, req.theme].filter((p) => !!p).join('/');
    next();
};

router
    .use(ensureHttps)
    .use(injectPrismic)
    .use(initPrismicApi)
    .use(themeCookie)

    .get('/', cache_Name('page', 'start'), cache.route(), async (req, res) => await res.renderPrismicPage('start'))
    .get('/page/:uid', cache_Name('page'), cache.route(), async (req, res) => await res.renderPrismicPage(req.params.uid))

    .get('/languages/:lang', (req, res) => {
        res.cookie('language', req.params.lang, { maxAge: 900000, httpOnly: true });
        res.redirect(req.header('Referer') || '/');
    })

    .get('/themes/:name', (req, res) => {
        res.cookie('theme', req.params.name, { maxAge: 900000, httpOnly: true });
        res.redirect(req.header('Referer') || '/');
    })

    .post('/callback/publish', async (req, res) => {
        if (!req.body.secret || req.body.secret !== process.env.PRISMIC_WEBHOOK_SECRET) {
            res.sendStatus(403);
        }
        const deleted = await Promise.resolve((resolve, reject) => {
            cache.del('', (err, deleted) => {
                if (err) {
                    reject(err);
                }
                resolve(deleted);
            });
        });
        res.send({ deleted });
    });
;

module.exports = router;
 