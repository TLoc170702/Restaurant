const express = require('express');
const multer = require('multer');
const { auth, authorizeAdmin } = require('../middleware/auth');
const roomController = require('../controllers/roomController');

const router = express.Router();
const upload = require('../middleware/upload');
router.all("*", auth, authorizeAdmin);

router.post('/addroom', upload.array('images', 6), roomController.createRoom);

router.get('/rooms', roomController.getAllRooms);

router.get('/editroom/:id', roomController.getRoomByIdController);

router.put('/editroom/:id', upload.array('images', 6), roomController.editRoom);

router.delete('/deleteroom/:id', roomController.removeRoom);

module.exports = router;
