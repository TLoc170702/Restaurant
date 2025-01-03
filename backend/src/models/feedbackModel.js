const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  feedback: { type: String, required: true },
  job: { type: String, required: true },
  images: { type: [String], required: true }
}, { timestamps: true });

const Feedback = mongoose.model('feedback', FeedbackSchema);

module.exports = Feedback;
