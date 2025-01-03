require("dotenv").config();

const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10


const createUserService = async (username, email, password) => {
  try {
    const user = await User.findOne({ email });
    if (user) {
      return {
        success: false,
        message: "Email already exists",
      };
    }

    const hashPassword = await bcrypt.hash(password, saltRounds);

    // Lưu người dùng vào database
    const result = await User.create({
      username: username,
      email: email,
      password: hashPassword,
      role: "MrLoc",
    });

    return {
      success: true,
      message: "User created successfully",
      data: result,
    };
  } catch (error) {
    console.error("Error creating user:", error);
    return {
      success: false,
      message: "Internal server error",
      error: error.message,
    };
  }
};

const loginService = async (email1, password) => {
  try {
    const user = await User.findOne({ email: email1 });
    if (!user) {
      return {
        EC: 1,
        EM: "Email not found"  // Nếu không tìm thấy email, trả về lỗi
      };
    }

    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword) {
      return {
        EC: 2,
        EM: "Email or password doesn't match"  // Nếu mật khẩu sai, trả về lỗi
      };
    }

    const payload = {
      email: user.email,
      username: user.username,
      role: user.role
    };

    const access_token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE
    });

    return {
      EC: 0,  // Success code
      EM: "Login successful",
      access_token,
      user: {
        email: user.email,
        username: user.username,
        role: user.role
      }
    };

  } catch (error) {
    console.log(error);
    return {
      EC: 500,
      EM: "Internal server error"  // Nếu có lỗi, trả về thông báo lỗi chung
    };
  }
};

const getUserService = async () => {
  try {
    let result = await User.find({}).select("-password");
    return result;

  } catch (error) {
    console.log(error);
    return null;
  }
};

const addUserService = async (userData) => {
  const { username, email, password, role } = userData;

  if (!username || !email || !password || !role) {
    throw new Error('All fields are required');
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return {
      success: false,
      message: "Email already exists",
    };
  }

  // Mã hóa mật khẩu
  const hashedPassword = await bcrypt.hash(password, 10);

  // Tạo người dùng mới
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    role,
  });

  // Lưu vào database
  await newUser.save();

  return {
    success: true,
    message: 'User added successfully',
    user: {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
    }
  };
};

const deleteUserService = async (id) => {
  const result = await User.findByIdAndDelete(id); // Xóa người dùng theo ID
  if (!result) {
    throw new Error("User not found");
  }
  return { message: "User deleted successfully" };
};



module.exports = {
  createUserService, loginService, getUserService, 
  addUserService, deleteUserService
}