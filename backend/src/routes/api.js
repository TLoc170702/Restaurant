const express = require('express');
const { createUser, handleLogin, getAccount, getUser, getAdmin,
    addUser, deleteUser 
} = require('../controllers/userController');
const { auth, authorizeAdmin } = require('../middleware/auth');
const delay = require('../middleware/delay');


const routerAPI = express.Router();

// set middleware
routerAPI.all("*", auth);

routerAPI.get("/", (req,res) => {
    return res.status(200).json("hello")
})

routerAPI.post("/register", createUser);

routerAPI.post("/login", handleLogin);

routerAPI.get("/account", getAccount);

module.exports = routerAPI;