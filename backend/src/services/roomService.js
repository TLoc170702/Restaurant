require("dotenv").config();

const Room = require('../models/roomModel');


const addRoom = async (roomData) => {
    try {
        const newRoom = new Room(roomData);
        const savedRoom = await newRoom.save();
        return { success: true, data: savedRoom };
    } catch (error) {
        console.error("Error adding room:", error);
        return { success: false, message: "Failed to add room", error: error.message };
    }
};

const getRooms = async () => {
    try {
        let result = await Room.find()
        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
};

const getRoomById = async (id) => {
    try {
        const room = await Room.findById(id);
        if (!room) {
            throw new Error('Room not found');
        }
        return room;
    } catch (error) {
        throw error;
    }
};

const updateRoom = async (roomId, data, files, imagesToDelete) => {
    try {
        const existingRoom = await Room.findById(roomId);
        if (!existingRoom) {
            throw new Error('Room not found');
        }

        // Cập nhật các trường
        existingRoom.room = data.room || existingRoom.room;
        existingRoom.description = data.description || existingRoom.description;
        existingRoom.price = data.price || existingRoom.price;
        existingRoom.bed = data.bed || existingRoom.bed;
        existingRoom.guest = data.guest || existingRoom.guest;

        // Nếu có ảnh mới
        if (files && files.length > 0) {
            const uploadedImages = files.map((file) => file.path);
            existingRoom.images = [...existingRoom.images, ...uploadedImages];
        }

        // Xử lý xóa ảnh (nếu có)
        if (imagesToDelete && imagesToDelete.length > 0) {
            imagesToDelete.forEach((imagePath) => {
                // Đảm bảo imagePath là đường dẫn tệp thực tế
                const fullImagePath = path.join(__dirname, '../uploads', imagePath);
                if (fs.existsSync(fullImagePath)) {
                    fs.unlinkSync(fullImagePath); // Xóa ảnh từ hệ thống tệp
                }
            });

            // Cập nhật lại danh sách ảnh trong cơ sở dữ liệu
            existingRoom.images = existingRoom.images.filter(image => !imagesToDelete.includes(image));
        }


        // Lưu vào cơ sở dữ liệu
        return await existingRoom.save();
    } catch (error) {
        throw new Error(error.message);
    }
};

const deleteRoom = async (roomId) => {
    const result = await Room.findByIdAndDelete(roomId); // Xóa người dùng theo ID
    if (!result) {
        throw new Error("Room not found");
    }
    return { message: "Room deleted successfully" };
    // return await Room.findByIdAndDelete(roomId);
};

module.exports = {
    addRoom,
    getRooms,
    deleteRoom,
    updateRoom,
    getRoomById
};
