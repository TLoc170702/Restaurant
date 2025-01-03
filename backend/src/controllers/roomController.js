const roomService = require('../services/roomService');


const createRoom = async (req, res) => {
    const { room, description, price, bed, guest } = req.body;
    const images = req.files ? req.files.map(file => file.path) : [];

    // Kiểm tra các trường bắt buộc
    if (!room || !description || !price || !bed || !guest || images.length === 0) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const roomData = { room, description, price, bed, guest, images };

    // Thêm phòng mới vào cơ sở dữ liệu
    const result = await roomService.addRoom(roomData);
    if (result.success) {
        return res.status(201).json(result);
    } else {
        return res.status(500).json(result);
    }
};

const getAllRooms = async (req, res) => {
    const data = await roomService.getRooms();
    return res.status(200).json(data)
};

const getRoomByIdController = async (req, res) => {
    const { id } = req.params; // Lấy id từ URL
    try {
        const room = await roomService.getRoomById(id);
        res.status(200).json(room);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const editRoom = async (req, res) => {
    const roomId = req.params.id;
    const { room, description, price, bed, guest, imagesToDelete } = req.body;
    const files = req.files;

    try {
        const updatedRoom = await roomService.updateRoom(roomId, { room, description, price, bed, guest, imagesToDelete }, files);
        res.status(200).json({ success: true, message: 'Room updated successfully.', room: updatedRoom });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const removeRoom = async (req, res) => {
    try {
        const { id } = req.params; // Lấy ID từ URL
        const result = await roomService.deleteRoom(id);
        res.status(200).json({
            success: true,
            message: result.message,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || "Failed to delete room",
        });
    }
};

module.exports = {
    createRoom,
    getAllRooms,
    removeRoom,
    editRoom,
    getRoomByIdController
};
