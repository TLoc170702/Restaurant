const jwt = require('jsonwebtoken');

const whileLists = [
    "/",
    "/register",
    "/login",
    "/admin/feedbacks",
    "/admin/offers",
    "/admin/rooms",
    "/admin/staffs",
    "/admin/editroom",
].map(item => `/v1/api${item}`);

const auth = (req, res, next) => {

    const isWhitelisted = whileLists.some(path => path === req.originalUrl);
    // const isWhitelisted = whileLists.some(path => req.originalUrl.startsWith(path));

    if (isWhitelisted) {
        return next();
    }

    if (req.headers && req.headers.authorization) {
        if (!req.headers || !req.headers.authorization) {
            return res.status(401).json({
                success: false,
                message: "Authorization header is missing"
            });
        }
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                message: "Token không hợp lệ hoặc không có"
            });
        }
        try {
            // Xác minh token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = {
                email: decoded.email,
                username: decoded.username,
                role: decoded.role
            }
            req.user = decoded; // Đính kèm thông tin user vào req để dùng ở các hàm sau
            console.log(decoded)
            return next();
        } catch (error) {
            return res.status(401).json({
                message: "Token không hợp lệ hoặc đã hết hạn",
                error: error.message
            });
        }
    } else {
        // Trường hợp không có token trong headers
        return res.status(401).json({
            message: "Bạn chưa truyền access token hoặc token bị hết hạn"
        });
    }
};

const authorizeAdmin = (req, res, next) => {
    console.log(req.user);

    // const isWhitelisted = whileLists.some(path => path === req.originalUrl);
    const isWhitelisted = whileLists.some(path => req.originalUrl.startsWith(path));

    if (isWhitelisted) {
        return next();
    }

    if (req.user?.role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: "Access denied. Admins only."
        });
    }
    next();
};



module.exports = {
    auth,
    authorizeAdmin
};
