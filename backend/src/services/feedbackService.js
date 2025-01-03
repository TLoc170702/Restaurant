require("dotenv").config();

const Feedback = require('../models/feedbackModel');


const addFeedback= async (feedbackData) => {
    try {
        const newFeedback = new Feedback(feedbackData);
        const savedFeedback = await newFeedback.save();
        return { success: true, data: savedFeedback };
    } catch (error) {
        console.error("Error adding feedback:", error);
        return { success: false, message: "Failed to add feedback", error: error.message };
    }
};

const getFeedbacks = async () => {
    try {
        let result = await Feedback.find()
        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
};

const getFeedbackById = async (id) => {
    try {
        const feedback = await Feedback.findById(id);
        if (!feedback) {
            throw new Error('Feedback not found');
        }
        return feedback;
    } catch (error) {
        throw error;
    }
};

const updateFeedback = async (feedbackId, data, files, imagesToDelete) => {
    try {
        const existingFeedback = await Feedback.findById(feedbackId);
        if (!existingFeedback) {
            throw new Error('feedback not found');
        }

        // Cập nhật các trường
        existingFeedback.name = data.name || existingFeedback.name;
        existingFeedback.feedback = data.feedback || existingFeedback.feedback;
        existingFeedback.job = data.job || existingFeedback.job;

        // Nếu có ảnh mới
        if (files && files.length > 0) {
            const uploadedImages = files.map((file) => file.path);
            existingFeedback.images = [...existingFeedback.images, ...uploadedImages];
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
            existingFeedback.images = existingFeedback.images.filter(image => !imagesToDelete.includes(image));
        }


        // Lưu vào cơ sở dữ liệu
        return await existingFeedback.save();
    } catch (error) {
        throw new Error(error.message);
    }
};

const deleteFeedback = async (feedbackId) => {
    const result = await Feedback.findByIdAndDelete(feedbackId); // Xóa người dùng theo ID
    if (!result) {
        throw new Error("feedback not found");
    }
    return { message: "feedback deleted successfully" };
};

module.exports = {
    addFeedback,
    getFeedbacks,
    getFeedbackById,
    updateFeedback,
    deleteFeedback
};
