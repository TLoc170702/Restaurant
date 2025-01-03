const express = require('express');
const multer = require('multer'); 
const { auth, authorizeAdmin } = require('../middleware/auth');
const offerController = require('../controllers/offerController');

const router = express.Router();
const upload = require('../middleware/upload');
router.all("*", auth, authorizeAdmin);

router.post('/addoffer', upload.array('images', 1), offerController.createOffer);

router.get('/offers', offerController.getAllOffers);

router.get('/getofferbyid/:id', offerController.getOfferByIdController);

router.put('/editoffer/:id', upload.array('images', 1), offerController.editOffer);

router.delete('/deleteoffer/:id', offerController.removeOffer);

module.exports = router;
