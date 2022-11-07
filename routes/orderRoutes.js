const express = require('express');
const { route } = require('./authRoutes');
const router = express.Router();

//get all orders
router.get('/');
//get a single order with orderId
router.get('/:id');
//create a new order
router.post('/');
//update an existing order
router.patch('/:id');

module.exports = router;
