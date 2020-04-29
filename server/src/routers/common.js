'use strict';

const express = require('express');
const router = new express.Router();

// status test endpoint
router.get('/status', async (req, res) => {
  console.log(`\n[GET] - '/status'.`);
  res.send('Server is working!');
});

module.exports = router;
