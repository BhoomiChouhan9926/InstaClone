const postModel = require('../models/post.model.js')
const likeModel = require('../models/like.model.js')
const ImageKit = require('@imagekit/nodejs');
const  { toFile } = require('@imagekit/nodejs');
const { Folders } = require('@imagekit/nodejs/resources/index.js');
const jwt = require('jsonwebtoken');
const postRouter = require('../routes/post.route.js');

const imageKit = new ImageKit({
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY
})





async function createPostController(req,res){
    const{imageUrl , caption} = req.body;
  //  console.log(req.body ,req.file )
    
    const file = await imageKit.files.upload({
        file : await toFile(Buffer.from(req.file.buffer),'file'),
         fileName: 'test',
         folder:"Insta-clone-images"
    })

   

    // here creating the post 
    const post = await postModel.create({
       caption: caption,
        user:req.user.id,
       imageUrl :file.url
    })

    res.status(201).json({
        "message":"Post created successfully",
         post
    })
    

 console.log(caption,decoded.id,file.url);
  
}

// here is the api to get all the post of the specific user 
async function getPostController(req,res){

   

    const userId = req.user.id;
    const posts = await postModel.find({
        "user":userId
    })

res.status(200).json({
    "message":"Posts fetched successfully",
    posts
})

}
// here is the api to get the specific post details
async function getDetailsPostController(req,res){
    const postId = req.params.postId;

// finding the post user want to see
const post = await postModel.findById(postId);

// if post not found
if(!post){
     return res.status(404).json({
            "message":"Post not found"
        })
}
// agar post exist krti hai then we will check k requested user and post created user are same

const isValidUser = post.user.toString() === req.user.id;
if(!isValidUser){
    return res.status(403).json({
            "message":"forbidden content"
        })
}

res.status(200).json({
    "message":"post fetched successfuly",
    post
})
}
// here is the controller to like any of the post 

async function likeController(req,res){
    const username = req.user.username;
    const postId = req.params.postId

    // here we will check if the post exist or not 
    const post = await postModel.findById(postId)

    if(!post){
        res.status(400).json({
            "message":"Post not found"
        })
    }

    const like = await likeModel.create({
        post : postId,
        user:username
    }) 

    res.status(201).json({
        "message":"Post liked successfully ",
        like
    })
}
// here is the controller to unlike the post 
async function unLikeController(req,res){
    const postId = req.params.postId
    const username = req.user.username
    // finding if the post is being liked by the user or not 
    // this wull be checked in the likse model if the resoures with the postId and username exist then we cas the post is liked

    const isLiked = await likeModel.findOne({
        post:postId,
        user:username
    })
// when post is not liked 
    if(!isLiked){
        return res.status(400).json({
            "message":"You did't like the post"
        })
    }
// when post is liked
await likeModel.findByIdAndDelete({ _id:isLiked._id})

return res.status(200).json({
    "message":"Post unliked successfully"
})

}
 async function feedController(req,res){
    const user = req.user
    // this weill give all the post in the db
    const posts = await Promise.all(await (await postModel.find().sort({_id : -1}).populate("user").lean()).map(async (post)=>{
              const isLiked = await likeModel.findOne({
                      user:user.username,
                      post:post._id
              })
              post.isLiked = Boolean (isLiked)

              return post
    }))

    
    res.status(200).json({
        "message":"Posts fetched successfully",
        posts
    })

 }

module.exports = {
    createPostController,
    getPostController,
    getDetailsPostController,
    likeController,
    unLikeController,
    feedController
}