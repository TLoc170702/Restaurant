const offerService = require('../services/offerService');

const createOffer = async (req, res) => {
    const offer = req.body.offer;
    const images = req.files ? req.files.map(file => file.path) : [];

    // Kiểm tra các trường bắt buộc
    if (offer === 0) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const offerData = { offer, images };

    // Thêm phòng mới vào cơ sở dữ liệu
    const result = await offerService.addOffer(offerData);
    if (result.success) {
        return res.status(201).json(result);
    } else {
        return res.status(500).json(result);
    }
};

const getAllOffers = async (req, res) => {
    const data = await offerService.getOffers();
    return res.status(200).json(data)
};

const getOfferByIdController = async (req, res) => {
    const { id } = req.params; // Lấy id từ URL
    try {
        const offer = await offerService.getOferById(id);
        res.status(200).json(offer);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const editOffer = async (req, res) => {
    const offerId = req.params.id;
    const { offer, imagesToDelete } = req.body;
    const files = req.files;

    try {
        const updatedOffer = await offerService.updateOffer(offerId, { offer, imagesToDelete }, files);
        res.status(200).json({ success: true, message: 'Offer updated successfully.', offer: updatedOffer });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const removeOffer = async (req, res) => {
    try {
        const { id } = req.params; // Lấy ID từ URL
        const result = await offerService.deleteOffer(id);
        res.status(200).json({
            success: true,
            message: result.message,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || "Failed to delete offer",
        });
    }
};


module.exports = {
    createOffer,
    getAllOffers,
    getOfferByIdController,
    editOffer,
    removeOffer
};
