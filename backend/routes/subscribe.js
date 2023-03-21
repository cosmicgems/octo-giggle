const express = require('express');
const router = express.Router();
const { subscribe} = require('../controllers/subscribe');

// validators
const { runValidation } = require('../validators');
const { subscribeValidator } = require('../validators/subscribe');

router.post('/subscribe', subscribeValidator, runValidation, subscribe);

module.exports = router;