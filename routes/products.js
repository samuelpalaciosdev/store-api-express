const express = require('express');
const getAllProducts = require('../controllers/products');
const router = express.Router();

const gettAllProducts = require('../controllers/products');

router.route('/').get(getAllProducts);

module.exports = router;
