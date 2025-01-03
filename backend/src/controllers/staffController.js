const staffService = require('../services/staffService');


const createStaff = async (req, res) => {
    const { staff, position } = req.body;
    const images = req.files ? req.files.map(file => file.path) : [];

    if (!staff || !position || images.length === 0) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const staffData = { staff, position, images };

    const result = await staffService.addStaff(staffData);
    if (result.success) {
        return res.status(201).json(result);
    } else {
        return res.status(500).json(result);
    }
};

const getAllStaffs = async (req, res) => {
    const data = await staffService.getstaffs();
    return res.status(200).json(data)
};

const getStaffByIdController = async (req, res) => {
    const { id } = req.params; // Lấy id từ URL
    try {
        const staff = await staffService.getStaffById(id);
        res.status(200).json(staff);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const editStaff = async (req, res) => {
    const staffId = req.params.id;
    const { staff, position, imagesToDelete } = req.body;
    const files = req.files;

    try {
        const updatedStaff = await staffService.updateStaff(staffId, { staff, position, imagesToDelete }, files);
        res.status(200).json({ success: true, message: 'Staff updated successfully.', staff: updatedStaff });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const removeStaff = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await staffService.deleteStaff(id);
        res.status(200).json({
            success: true,
            message: result.message,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || "Failed to delete staff",
        });
    }
};

module.exports = {
    createStaff,
    getAllStaffs,
    getStaffByIdController,
    editStaff,
    removeStaff
};
