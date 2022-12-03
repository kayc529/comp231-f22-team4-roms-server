const express = require('express');
const router = express.Router();
const {
    getAllStaffs,
    getStaff,
    addStaff,
    updateStaff,
    deleteStaff
} = require('../controllers/staffController');

router.get('/', getAllStaffs);
router.get('/:id', getStaff);
router.post('/add', addStaff);
router.patch('/edit/:id', updateStaff);
router.delete('/delete/:id', deleteStaff);

module.exports = router;
