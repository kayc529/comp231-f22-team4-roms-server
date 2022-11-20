const express = require('express');
const router = express.Router();
const {
  getAllMenuItems,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  uploadMenuItemImage,
} = require('../controllers/menuController');

//get all menu items
router.get('/', getAllMenuItems);
//get a single menu item
router.get('/:id', getMenuItem);
//create a new menu item
router.post('/', createMenuItem);
//upload menu item image
router.post('/upload-image/:id', uploadMenuItemImage);
//update a menu item
router.patch('/:id', updateMenuItem);
//delete a menu item
router.delete('/:id', deleteMenuItem);

module.exports = router;
