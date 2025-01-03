const mongoose = require('mongoose');

const OfferSchema = new mongoose.Schema({
  offer: { type: String, required: true },
  images: { type: [String], required: true }
}, { timestamps: true });

const Offer = mongoose.model('offer', OfferSchema);

module.exports = Offer;
