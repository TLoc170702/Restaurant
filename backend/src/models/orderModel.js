const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    room: { type: String, required: true },
    checkinDate: { type: Date, required: true },
    checkoutDate: { type: Date, required: true },
    children: { type: Number, required: true },
    adults: { type: Number, required: true },
    confirm: { type: String, required: true },
},  { timestamps: true });

const Order= mongoose.model('order', OrderSchema);

module.exports = Order
