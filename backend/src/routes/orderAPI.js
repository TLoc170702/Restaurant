const express = require('express');
const { auth, authorizeAdmin } = require('../middleware/auth');
const orderController = require('../controllers/orderController');

const router = express.Router();
const upload = require('../middleware/upload');
router.all("*", auth);

router.post('/orderroom', orderController.orderRoom);

router.get('/orders',authorizeAdmin, orderController.getAllOrderRooms);

router.get('/orders/:id',authorizeAdmin, orderController.getOrderRoomByIdController);

router.put('/editorder/:id',authorizeAdmin, orderController.editOrder);

router.delete('/deleteorder/:id',authorizeAdmin, orderController.removeOrder);



module.exports = router;
