const express = require('express');
const { auth, authorizeAdmin } = require('../middleware/auth');
const orderController = require('../controllers/orderController');

const router = express.Router();
const upload = require('../middleware/upload');
router.all("*", auth, authorizeAdmin);

router.post('/orderroom', orderController.orderRoom);

router.get('/orders', orderController.getAllOrderRooms);

router.get('/orders/:id', orderController.getOrderRoomByIdController);

router.put('/editorder/:id', orderController.editOrder);

router.delete('/deleteorder/:id', orderController.removeOrder);



module.exports = router;
