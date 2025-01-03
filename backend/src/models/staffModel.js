const mongoose = require('mongoose');

const StaffSchema = new mongoose.Schema({
  staff: { type: String, required: true },
  position: { type: String, required: true },
  images: { type: [String], required: true }
}, { timestamps: true });

const Staff = mongoose.model('staff', StaffSchema);

module.exports = Staff;
