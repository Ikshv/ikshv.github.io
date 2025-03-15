// routes/index.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to my backend!');
});

module.exports = router;
