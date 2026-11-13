const express = require ('express');
const authRouter = express.Router();
const userModel = require('../models/user.model.js')
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const IdntifyUser = require('../middleware/auth.middleware.js')

const authController = require('../controllers/auth.controller.js')

// here is the register api
authRouter.post("/register",authController.registerController)



// here is the login api 
authRouter.post("/login",authController.loginController)


 // here is the get me api
 authRouter.get("/get-me",IdntifyUser,authController.getMeController)


module.exports = authRouter;