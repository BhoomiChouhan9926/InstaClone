const express = require ('express');
const postRouter = express.Router();
const postController = require('../controllers/post.controller')
const multer =require('multer');
const upload = multer({storage:multer.memoryStorage()});
const IdntifyUser = require('../middleware/auth.middleware')

// here we will have the api to crae the post 
postRouter.post("/",upload.single("imageUrl"),IdntifyUser,postController.createPostController);

// here is the api to get all post of the specific user

postRouter.get("/",IdntifyUser,postController.getPostController);

postRouter.get("/details/:postId",IdntifyUser,postController.getDetailsPostController)

// @route : /api/post/like/:postId
// here we will have the api to like someones post
postRouter.post("/like/:postId",IdntifyUser,postController.likeController) 


//@route : /api/post/unlike/:postId
// here we will have the api to un;like teh post 
postRouter.post("/unlike/:postId",IdntifyUser,postController.unLikeController)

// here we will have one more route which will fetch all the post created on the database

//@route : /api/post/feed
postRouter.get("/feed",IdntifyUser,postController.feedController)





module.exports= postRouter;