// routes/api.js
const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

// GET /api/status — returns a status message
router.get('/status', apiController.getStatus);

// POST /api/stream — receives data (e.g., from a webcam stream)
router.post('/stream', apiController.receiveStream);

module.exports = router;
