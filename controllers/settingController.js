const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const StoreInfo = require('../models/StoreInfo');

const getStoreInfo = async (req, res) => {
  let storeInfo = await StoreInfo.findOne({});

  if (!storeInfo) {
    await StoreInfo.create({
      name: '',
      desc: '',
      openHour: '',
      isOpen: true,
    });
    storeInfo = await StoreInfo.findOne({});
  }

  res.status(StatusCodes.OK).json({ success: true, setting: storeInfo });
};

const updateStoreInfo = async (req, res) => {
  const newStoreInfo = req.body;

  const updatedStoreInfo = await StoreInfo.findOneAndUpdate(
    { _id: newStoreInfo._id },
    newStoreInfo,
    {
      new: true,
    }
  );

  res.status(StatusCodes.OK).json({ success: true, setting: updatedStoreInfo });
};

module.exports = { getStoreInfo, updateStoreInfo };
