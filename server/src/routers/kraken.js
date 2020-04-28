'use strict';

const express = require('express');
const router = new express.Router();
const rp = require('request-promise');

const baseUri = 'https://api.kraken.com/0/public'

router.get('/public/data', async (req, res) => {

  const uriMapping = {
    assets: `${baseUri}/Assets`,
    assetPairs: `${baseUri}/AssetPairs`,
  };

  // query string (assets | assetpairs)
  const qs = req.query.type;

  const options = {
    uri: uriMapping[qs],
    headers: {

    },
    json: true
  };

  rp(options)
    .then(({
      result
    }) => {
      console.log(`Processed request.`);
      console.log("\x1b[36m", "Response: ", "\x1b[37m", result);
      res.send(result);
    })
})

module.exports = router;