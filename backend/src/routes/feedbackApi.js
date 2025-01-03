const express = require('express');
const multer = require('multer');
const { auth, authorizeAdmin } = require('../middleware/auth');
const feedbackController = require('../controllers/feedbackController');

const router = express.Router();
const upload = require('../middleware/upload');
router.all("*", auth, authorizeAdmin);

router.post('/addfeedback', upload.array('images', 1), feedbackController.createFeedback);

router.get('/feedbacks', feedbackController.getAllFeedbacks);

router.get('/getfeedbackbyid/:id', feedbackController.getFeedbackByIdController);

router.put('/editfeedback/:id', upload.array('images', 1), feedbackController.editFeedback);

router.delete('/deletefeedback/:id', feedbackController.removeFeedback);

module.exports = router;
