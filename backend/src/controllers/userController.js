const { createUserService, loginService, getUserService,
  addUserService, deleteUserService 
} = require("../services/userService")


const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  const result = await createUserService(username, email, password);
  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: result.message,
    });
  }
  res.status(201).json({
    success: true,
    message: result.message,
    data: result.data,
  });
};

const handleLogin = async (req, res) => {
  const { email, password, role } = req.body;
  const data = await loginService(email, password, role);
  if (data.EC !== 0) {
    return res.status(400).json(data);  
  }
  return res.status(200).json(data);  
};

const getAccount = async (req, res) => {
  return res.status(200).json(req.user)
};

const getAdmin = async (req, res) => {
  return res.status(200).json(req.user)
};

const getUser = async (req, res) => {
  const data = await getUserService();
  return res.status(200).json(data)
};

const addUser = async (req, res) => {
  const userData = req.body;
  const result = await addUserService(userData);
  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: result.message
    });
  }
  res.status(201).json({
    success: true,
    message: "User created successfully"
  });
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params; // Lấy ID từ URL
    const result = await deleteUserService(id);
    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to delete user",
    });
  }
};






module.exports = {
  createUser, handleLogin, getAccount, getUser, getAdmin,
  addUser, deleteUser
}