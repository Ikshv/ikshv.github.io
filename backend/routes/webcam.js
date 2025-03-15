const express = require('express');
const router = express.Router();
const webcamController = require('../controllers/webcamController')

router.get('/status', webcamController.getStatus);

router.post('/stream', webcamController.receiveStream);

module.exports = router;