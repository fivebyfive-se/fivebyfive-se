const express = require('express');

const router = express.Router();
const route_image = require('./image');

router
    .use('/image', route_image)
    .get('/', (req, res) => res.sendStatus(200))
;

module.exports = router;
 