const express = require('express');
const { route } = require('./authRoutes');
const router = express.Router();

const {
  getAllOrders,
  getSingleOrder,
  createOrder,
  updateOrder,
  deleteOrder,
} = require('../controllers/orderContoller');

//get all orders
router.get('/', getAllOrders);
//get a single order with orderId
router.get('/:id', getSingleOrder);
//create a new order
router.post('/', createOrder);
//update an existing order
router.patch('/:id', updateOrder);
//delete an existing order
router.delete('/:id', deleteOrder);

module.exports = router;
