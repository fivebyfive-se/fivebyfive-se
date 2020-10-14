const express = require('express');
const Redis = require('ioredis');

const cache = require('express-redis-cache')({
    client: new Redis(process.env.REDIS_URL),
    prefix: 'kalle.surf',
    expire: 60 * 60 * 24 * 7 // 1 week
});

const ensureHttps = require('@lib/middleware/ensure-https');

const router = express.Router();

router
    .use(ensureHttps)

    .get('/', cache.route(), async (req, res) => res.render('index'))
;

module.exports = router;
 