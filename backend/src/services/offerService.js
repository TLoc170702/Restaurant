require("dotenv").config();

const Offer = require('../models/offerModel');

const addOffer = async (offerData) => {
    try {
        const newOffer = new Offer(offerData);
        const savedOffer = await newOffer.save();
        return { success: true, data: savedOffer };
    } catch (error) {
        console.error("Error adding offer:", error);
        return { success: false, message: "Failed to add offer", error: error.message };
    }
};

const getOffers = async () => {
    try {
        let result = await Offer.find()
        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
};

const getOferById = async (id) => {
    try {
        const offer = await Offer.findById(id);
        if (!offer) {
            throw new Error('offer not found');
        }
        return offer;
    } catch (error) {
        throw error;
    }
};

const updateOffer = async (offerId,  data, files, imagesToDelete) => {
    try {
        const existingOffer = await Offer.findById(offerId);
        if (!existingOffer) {
            throw new Error('Offer not found');
        }

        // Cập nhật các trường
        existingOffer.offer = data.offer || existingOffer.offer;

        // Nếu có ảnh mới
        if (files && files.length > 0) {
            const uploadedImages = files.map((file) => file.path);
            existingOffer.images = [...existingOffer.images, ...uploadedImages];
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
            existingOffer.images = existingOffer.images.filter(image => !imagesToDelete.includes(image));
        }


        // Lưu vào cơ sở dữ liệu
        return await existingOffer.save();
    } catch (error) {
        throw new Error(error.message);
    }
};

const deleteOffer = async (offerId) => {
    const result = await Offer.findByIdAndDelete(offerId); // Xóa người dùng theo ID
    if (!result) {
        throw new Error("Offer not found");
    }
    return { message: "Offer deleted successfully" };
};




module.exports = {
    addOffer,
    getOffers,
    getOferById,
    updateOffer,
    deleteOffer
};