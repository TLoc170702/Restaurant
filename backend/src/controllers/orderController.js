const orderService = require('../services/orderService');
const moment = require('moment'); 

const orderRoom = async (req, res) => {
    try {
        const { username, email } = req.user;
        const { checkinDate, checkoutDate, children, adults, room } = req.body;

        if (!username || !email || !checkinDate || !checkoutDate || !children || !adults || !room) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        if (!moment(checkinDate, 'YYYY-MM-DD', true).isValid() || !moment(checkoutDate, 'YYYY-MM-DD', true).isValid()) {
            return res.status(400).json({ success: false, message: "Invalid date format. Expected YYYY-MM-DD." });
        }

        // const formattedCheckinDate = moment(checkinDate, 'YYYY-MM-DD').format('YYYY-MM-DD');
        // const formattedCheckoutDate = moment(checkoutDate, 'YYYY-MM-DD').format('YYYY-MM-DD');

        const orderRoomData = {
            username,
            email,
            checkinDate,
            checkoutDate,
            children,
            adults,
            room,
            confirm: "Processing",
        };

        console.log("Processing order with data:", orderRoomData);

        const result = await orderService.orderRoom(orderRoomData);

        if (result.success) {
            return res.status(201).json(result);
        } else {
            return res.status(500).json({ success: false, message: "Failed to process order" });
        }
    } catch (error) {
        console.error("Error processing order:", error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};

const getAllOrderRooms = async (req, res) => {
    const data = await orderService.getOrderRooms();
    return res.status(200).json(data)
};

const getOrderRoomByIdController = async (req, res) => {
    const { id } = req.params; // Lấy id từ URL
    try {
        const order = await orderService.getOrderRoomById(id);
        res.status(200).json(order);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const editOrder = async (req, res) => {
    const orderid = req.params.id;
    const { confirm } = req.body;

    try {
        const updatedOrder = await orderService.updateOrder(orderid, { confirm });
        res.status(200).json({ success: true, message: 'Order updated successfully.', order: updatedOrder });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const removeOrder = async (req, res) => {
    try {
        const { id } = req.params; // Lấy ID từ URL
        const result = await orderService.deleteOrderRoom(id);
        res.status(200).json({
            success: true,
            message: result.message,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || "Failed to delete order",
        });
    }
};

module.exports = {
    orderRoom,
    getAllOrderRooms,
    getOrderRoomByIdController,
    editOrder,
    removeOrder
};
