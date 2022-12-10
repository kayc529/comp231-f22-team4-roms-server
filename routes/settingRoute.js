const express = require('express');
const router = express.Router();
const {
  getStoreInfo,
  updateStoreInfo,
} = require('../controllers/settingController');

router.get('/', getStoreInfo);
router.patch('/', updateStoreInfo);

module.exports = router;
