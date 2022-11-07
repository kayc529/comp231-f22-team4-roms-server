const MenuItem = require('../models/MenuItem');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

const getAllMenuItems = async (req, res) => {
  //TODO handle search queries
  const menuItems = await MenuItem.find({});
  res
    .status(StatusCodes.OK)
    .json({ success: true, menuItems: menuItems, count: menuItems.length });
};

const getMenuItem = async (req, res) => {
  //get the id from the param
  const { id } = req.params;
  const menuItem = await MenuItem.findOne({ _id: id });

  //if no menu item with such id is found, throw a not found error
  if (!menuItem) {
    //you can customize the error message
    throw CustomError.NotFoundError(`No menu item with id ${id} found`);
  }

  res.status(StatusCodes.OK).json({ success: true, menuItem: menuItem });
};

const createMenuItem = async (req, res) => {
  //an object of the menu item is passed from the frontend in the request body
  const newMenuItem = await MenuItem.create(req.body);
  //the response will include the newly created menu item
  //this is optional depending on whether the frontend needs this info
  res
    .status(StatusCodes.CREATED)
    .json({ success: true, menuItem: newMenuItem });
};

const updateMenuItem = async (req, res) => {
  const { id } = req.params;
  const menuItem = await MenuItem.findOne({ _id: id });

  if (!menuItem) {
    //you can customize the error message
    throw CustomError.NotFoundError(`No menu item with id ${id} found`);
  }

  const menuItemToUpdate = req.body;
  const updatedMenuItem = await MenuItem.findOneAndUpdate(
    {
      _id: id,
    },
    menuItemToUpdate,
    {
      //this means the updatedMenuItem will reflect the updated info
      new: true,
    }
  );

  res.status(StatusCodes.OK).json({ success: true, menuItem: updatedMenuItem });
};

const deleteMenuItem = async (req, res) => {
  const { id } = req.params;
  const menuItem = await MenuItem.findOne({ _id: id });

  if (!menuItem) {
    //you can customize the error message
    throw CustomError.NotFoundError(`No menu item with id ${id} found`);
  }

  await MenuItem.findOneAndDelete({ _id: id });

  res.status(StatusCodes.OK).json({ success: true });
};

module.exports = {
  getAllMenuItems,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
};
