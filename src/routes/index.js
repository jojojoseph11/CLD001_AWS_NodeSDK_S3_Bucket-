const express = require('express');
const router = new express.Router();
const userURL = require('./userRoutes');

const baseURL = '/api';

router.use(baseURL, userURL);

module.exports = router;