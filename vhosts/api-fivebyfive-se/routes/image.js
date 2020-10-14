const express = require('express');
const router = express.Router();
const Redis = require('ioredis');

const cache = require('express-redis-cache')({
    client: new Redis(process.env.REDIS_URL),
    prefix: 'api.fivebyfive.se',
    expire: 60 * 60 // 1 hour
});

const Jimp = require('jimp');

router
    .get('/noise/:width?/:height?/:format?', cache.route(), async (req, res) => {
        const max = 0x70, min = 0x10;
        const width = req.params.width || 50,
            height = req.params.height || width,
            format = req.params.format || 'image';

        const image = await Jimp.create(width, height);

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                const value = parseInt(Math.random() * (max - min)) + max;
                image.setPixelColor(Jimp.rgbaToInt(value, value, value, 255), x, y);
            }
        }
        const buffer = await image.getBufferAsync(Jimp.MIME_PNG);

        switch (format) {
            case 'image':
                res.writeHead(200, { 'Content-Type': 'image/png', 'Content-Length': buffer.length})
                res.end(buffer);
                break;
            case 'json':
                const image = buffer.toString('base64');
                res.contentType('application/json');
                res.send({ image, encoding: 'base64'  });
        }
    })
;

module.exports = router;