const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  room: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  bed: { type: String, required: true },
  guest: { type: String, required: true },
  images: { type: [String], required: true }
}, { timestamps: true });

const Room = mongoose.model('room', RoomSchema);

module.exports = Room;
