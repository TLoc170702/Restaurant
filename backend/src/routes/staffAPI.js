const express = require('express');
const multer = require('multer'); 
const { auth, authorizeAdmin } = require('../middleware/auth');
const staffController = require('../controllers/staffController');

const router = express.Router();
const upload = require('../middleware/upload');
router.all("*", auth, authorizeAdmin);


router.post('/addstaff', upload.array('images', 1), staffController.createStaff);

router.get('/staffs', staffController.getAllStaffs);

router.get('/getstaffbyid/:id', staffController.getStaffByIdController);

router.put('/editstaff/:id', upload.array('images', 1), staffController.editStaff);

router.delete('/deletestaff/:id', staffController.removeStaff);

module.exports = router;
