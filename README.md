# fivebyfive-se

This repository contains the source code for (at the moment) three sites,
which all run in one Heroku dyno:

 * [fivebyfive.se](https://www.fivebyfive.se) - the website of the consulting agency Fivebyfive.
 * [kalle.surf](https://www.kalle.surf) - the website of the owner/operator of Fivebyfive, @raisanen.
 * [api.fivebyfive.se](https://api.fivebyfive.se) - a collection of REST endpoints that may or may not disappear at any moment.

 All the sites are run through one express-server, using vhosts.

 ## api.fivebyfive.se

 Endpoints:

| Endpoint                               | Description   |
|----------------------------------------|:--------------|
| `/image/noise/:width?/:height?/:format?`| generate random black/white noise. Optional parameters: <dl><dt>`width`</dt><dt>height</dt><dd>in pixels (*default: 50*)</dd><dt>`format`</dt><dd>either `json` - returns a JSON-object containing the resulting image base64-encoded -- eg. `{"image": "...", "encoding": "base64" }` or `image` - returns a `image/png` response containing the image.</dd></dl> Results are cached by size and format, so don't expect a lot of randomness. |
