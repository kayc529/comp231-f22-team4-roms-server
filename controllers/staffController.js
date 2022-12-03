const Staff = require('../models/Staff');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

const getAllStaffs = async (req, res) => {
  const staffs = await Staff.find({});
  res
    .status(StatusCodes.OK)
    .json({ success: true, staffs: staffs, count: staffs.length });
};

const getStaff = async (req, res) => {
  const { id } = req.params;
  const staff = await Staff.findOne({ _id: id });

  if (!staff) {
    throw CustomError.NotFoundError(`No staff with id ${id} found`);
  }

  res.status(StatusCodes.OK).json({ success: true, staff: staff });
};

const addStaff = async (req, res) => {
  const newStaff = await Staff.create(req.body);
  res
    .status(StatusCodes.CREATED)
    .json({ success: true, staff: newStaff });
};

const updateStaff = async (req, res) => {
  const { id } = req.params;
  
  let updatedStaff = new Staff
  ({
    _id: id,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: req.body.password,
    role: req.body.role,
  });

  Staff.updateOne({ _id: id, }, updatedStaff, function (err)
  {
    if(err)
    {
      console.error(err);
      res.end(err);
    }
    res.status(StatusCodes.OK).json({ success: true, staff: updatedStaff });
  })
};

const deleteStaff = async (req, res) => {
  const { id } = req.params;
  const staff = await Staff.findOne({ _id: id });

  if (!staff) {
    throw CustomError.NotFoundError(`No staff with id ${id} found`);
  }

  await Staff.findOneAndDelete({ _id: id });

  res.status(StatusCodes.OK).json({ success: true });
};

module.exports = {
    getAllStaffs,
    getStaff,
    addStaff,
    updateStaff,
    deleteStaff
};
