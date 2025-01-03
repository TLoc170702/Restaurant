require("dotenv").config();

const Staff = require('../models/staffModel');

const addStaff = async (staffData) => {
    try {
        const newStaff = new Staff(staffData);
        const savedStaff = await newStaff.save();
        return { success: true, data: savedStaff };
    } catch (error) {
        console.error("Error adding room:", error);
        return { success: false, message: "Failed to add room", error: error.message };
    }
};

const getstaffs = async () => {
    try {
        let result = await Staff.find()
        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
};

const getStaffById = async (id) => {
    try {
        const staff = await Staff.findById(id);
        if (!staff) {
            throw new Error('Staff not found');
        }
        return staff;
    } catch (error) {
        throw error;
    }
};

const updateStaff = async (staffId, data, files, imagesToDelete) => {
    try {
        const existingStaff = await Staff.findById(staffId);
        if (!existingStaff) {
            throw new Error('Staff not found');
        }

        existingStaff.staff = data.staff || existingStaff.staff;
        existingStaff.position = data.position || existingStaff.position;


        if (files && files.length > 0) {
            const uploadedImages = files.map((file) => file.path);
            existingStaff.images = [...existingStaff.images, ...uploadedImages];
        }

        if (imagesToDelete && imagesToDelete.length > 0) {
            imagesToDelete.forEach((imagePath) => {
                const fullImagePath = path.join(__dirname, '../uploads', imagePath);
                if (fs.existsSync(fullImagePath)) {
                    fs.unlinkSync(fullImagePath);
                }
            });

            existingStaff.images = existingStaff.images.filter(image => !imagesToDelete.includes(image));
        }

        return await existingStaff.save();
    } catch (error) {
        throw new Error(error.message);
    }
};

const deleteStaff = async (staffId) => {
    const result = await Staff.findByIdAndDelete(staffId); // Xóa người dùng theo ID
    if (!result) {
        throw new Error("Staff not found");
    }
    return { message: "Staff deleted successfully" };
};

module.exports = {
    addStaff,
    getstaffs,
    getStaffById,
    updateStaff,
    deleteStaff
};
