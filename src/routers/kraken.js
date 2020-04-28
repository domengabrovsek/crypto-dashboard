'use strict';

const express = require('express');
const router = new express.Router();
const rp = require('request-promise');
const path = require('path');

const baseUri = 'https://api.kraken.com/0/public'

// status test endpoint
router.get('/assets', async (req, res) => {
  const options = {
    uri: `${baseUri}/Assets`,
    headers: {

    },
    json: true
  };

  rp(options)
    .then(({ result }) => {
      console.log(`Processed request.`);
      console.log("\x1b[36m", "Response: ", "\x1b[37m", result);
      res.set("Access-Control-Allow-Origin", '*');
      res.send(result);
    })
});

module.exports = router;