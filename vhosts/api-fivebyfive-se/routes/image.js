const express = require('express');
const router = express.Router();
const Redis = require('ioredis');

const cache = require('express-redis-cache')({
    client: new Redis(process.env.REDIS_URL),
    prefix: 'api.fivebyfive.se',
    expire: 60 * 60 // 1 hour
});

const Jimp = require('jimp');
const tumult = require('tumult');

const simplex2 = new tumult.Simplex2();

const transform = (x, y) => Math.cos(1 / simplex2.gen(x, y));
const generate = (max, x, y) => {
    const half = (max >> 1);
    return parseInt(half - transform(x, y) * half);
};
router
    .get('/noise/:width?/:height?/:format?', cache.route(), async (req, res) => {
        const width = req.params.width || 50,
            height = req.params.height || width,
            format = req.params.format || 'image';

        const image = await Jimp.create(width, height);
        const lcdX = width > 127 ? width / 127 : 1;
        const lcdY = height > 127 ? height / 127 : 1;

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                const value = generate(0x40, x/lcdX, y/lcdY);
                image.setPixelColor(Jimp.rgbaToInt(value, value, value, 255), x, y);
            }
        }
        image.deflateLevel(3);
        
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