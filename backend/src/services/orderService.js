require("dotenv").config();

const Order = require('../models/orderModel');


const orderRoom = async (orderRoomData) => {
    try {
        const orderRoom = new Order(orderRoomData);
        const savedRoom = await orderRoom.save();
        return { success: true, data: savedRoom };
    } catch (error) {
        console.error("Error order room:", error);
        return { success: false, message: "Failed to order room", error: error.message };
    }
};

const getOrderRooms = async () => {
    try {
        let result = await Order.find()
        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
};

const getOrderRoomById = async (id) => {
    try {
        const order = await Order.findById(id);
        if (!order) {
            throw new Error('Order not found');
        }
        return order;
    } catch (error) {
        throw error;
    }
};

const updateOrder = async (orderid, data) => {
    try {
        const existingOrder = await Order.findById(orderid);
        if (!existingOrder) {
            throw new Error('Order not found');
        }

        // Cập nhật các trường
        existingOrder.confirm = data.confirm || existingOrder.confirm;

        // Lưu vào cơ sở dữ liệu
        return await existingOrder.save();
    } catch (error) {
        throw new Error(error.message);
    }
};

const deleteOrderRoom = async (orderId) => {
    const result = await Order.findByIdAndDelete(orderId); 
    if (!result) {
        throw new Error("orderId not found");
    }
    return { message: "orderId deleted successfully" };
};


module.exports = {
    orderRoom,
    getOrderRooms,
    getOrderRoomById,
    updateOrder,
    deleteOrderRoom
};
