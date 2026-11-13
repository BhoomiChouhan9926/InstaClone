const express = require('express');

const userRouter = express.Router();
const userController = require('../controllers/user.controller')
const IdntifyUser = require('../middleware/auth.middleware')

// here is the api to built the follower feature
userRouter.post('/follow/:username',IdntifyUser,userController.followController)

//here is the api to unfollow
userRouter.post('/unfollow/:username',IdntifyUser,userController.unfollowController)

// geting all the follower and followee data
userRouter.get('/allfollow',IdntifyUser,userController.getAllData)


module.exports = userRouter;