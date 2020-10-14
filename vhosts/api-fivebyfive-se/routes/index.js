const express = require('express');

const router = express.Router();
const route_image = require('./image');

router
    .use('/image', route_image)
    .get('/', async (req, res) => await res.send(200))
;

module.exports = router;
 