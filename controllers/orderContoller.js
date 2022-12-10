const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

const getAllOrders = async (req, res) => {
  const orders = await Order.find({});
  res
    .status(StatusCodes.OK)
    .json({ success: true, orders, count: orders.length });
};

const getSingleOrder = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findOne({ _id: id });
  const orderItems = await OrderItem.find({ orderId: id }).populate('menuItem');

  if (!order) {
    throw new CustomError.NotFoundError(`No order with id ${id} found`);
  }

  let result = { ...order._doc, orderItems };

  res.status(StatusCodes.OK).json({ success: true, order: result });
};

const createOrder = async (req, res) => {
  const { orderType, pickupTime, reserveTime, items } = req.body;
  //1. create order
  const refNumber = Math.floor(Date.now() / 1000).toString(16);

  let orderObj = { referenceNumber: refNumber, orderType: orderType };
  if (orderType === 'DINE_IN') {
    orderObj = { ...orderObj, reserveTime };
  } else {
    orderObj = { ...orderObj, pickupTime };
  }

  const newOrder = await Order.create(orderObj);

  //2. create order items using the new order id
  // let itemsWithOrderId = items.map((item) => {
  //   console.log(item);
  //   return { ...item, orderId: newOrder._id };
  // });

  // await OrderItem.insertMany(itemsWithOrderId);

  res.status(StatusCodes.CREATED).json({ success: true, newOrder });
};

const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const order = await Order.findOne({ _id: id });

  if (!order) {
    throw new CustomError.NotFoundError(`No order with id ${id} found`);
  }

  const updatedOrder = await Order.findOneAndUpdate(
    { _id: id },
    { status: status },
    { new: true }
  );

  res.status(StatusCodes.OK).json({ success: true, order: updatedOrder });
};

const deleteOrder = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findOne({ _id: id });

  if (!order) {
    throw CustomError.NotFoundError(`No order with id ${id} found`);
  }

  await Order.deleteOne({ _id: id });

  res.status(StatusCodes.OK).json({ success: true, msg: 'Order deleted' });
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  createOrder,
  updateOrder,
  deleteOrder,
};
