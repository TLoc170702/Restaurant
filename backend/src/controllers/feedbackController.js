const feedbackService = require('../services/feedbackService');


const createFeedback = async (req, res) => {
    const { name, feedback, job } = req.body;
    const images = req.files ? req.files.map(file => file.path) : [];

    // Kiểm tra các trường bắt buộc
    if (!name || !feedback || !job || images.length === 0) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const feedbackData = { name, feedback, job, images };

    // Thêm phòng mới vào cơ sở dữ liệu
    const result = await feedbackService.addFeedback(feedbackData);
    if (result.success) {
        return res.status(201).json(result);
    } else {
        return res.status(500).json(result);
    }
};

const getAllFeedbacks = async (req, res) => {
    const data = await feedbackService.getFeedbacks();
    return res.status(200).json(data)
};

const getFeedbackByIdController = async (req, res) => {
    const { id } = req.params; // Lấy id từ URL
    try {
        const feedback = await feedbackService.getFeedbackById(id);
        res.status(200).json(feedback);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const editFeedback = async (req, res) => {
    const feedbackId = req.params.id;
    const { name, feedback, job, imagesToDelete } = req.body;
    const files = req.files;

    try {
        const updatedFeedback = await feedbackService.updateFeedback(feedbackId, { name, feedback, job, imagesToDelete }, files);
        res.status(200).json({ success: true, message: 'Feedback updated successfully.', feedback: updatedFeedback });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const removeFeedback = async (req, res) => {
    try {
        const { id } = req.params; // Lấy ID từ URL
        const result = await feedbackService.deleteFeedback(id);
        res.status(200).json({
            success: true,
            message: result.message,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || "Failed to delete feedback",
        });
    }
};

module.exports = {
    createFeedback,
    getAllFeedbacks,
    getFeedbackByIdController,
    editFeedback,
    removeFeedback
};
