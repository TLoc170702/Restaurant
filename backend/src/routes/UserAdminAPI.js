const express = require('express');
const { 
    getUser,
    getAdmin,
    addUser,
    deleteUser
} = require('../controllers/userController');

const { auth, authorizeAdmin } = require('../middleware/auth');


const routerAPI = express.Router();
// set middleware
routerAPI.all("*", auth, authorizeAdmin);

routerAPI.get("/permission", getAdmin);

routerAPI.get("/user", getUser);
routerAPI.post("/addUser", addUser);
routerAPI.delete("/deleteUser/:id", deleteUser);




module.exports = routerAPI;