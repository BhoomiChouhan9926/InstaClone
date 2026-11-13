const followModel = require('../models/follow.model');
const userModel = require('../models/user.model');

async function followController(req,res){
     const followerUsername = req.user.username;
     const followeeUsername = req.params.username;
     // here is the check to find the user can not follow themself
     if(followerUsername === followeeUsername){
        res.status(400).json({
            "message":"You can not follow yourself"
        })
     }
     // check if the user you want to follow exist 
     const followeeExist = await userModel.findOne({
        username :followeeUsername
     })

     if(!followeeExist){
        res.status(200).json({
            "message": "User you want to follow do not exist"
        })
     }
// check if the user is already following the followee
const isAreadyFollowing = await followModel.findOne({
    follower:followerUsername,
        followee:followeeUsername
})

if(isAreadyFollowing){
    res.status(200).json({
        "message":"You are already following " +followeeUsername
    })
}
     // make follower to follow followee we will create the followRecord in the followCollection

     const followRecord =  await followModel.create({
        follower:followerUsername,
        followee:followeeUsername
     })
res.status(201).json({
    "mesage":"You are following " + followeeUsername,
    followRecord
})


}

async function unfollowController(req,res){
        const followerUsername = req.user.username;
     const followeeUsername = req.params.username;

     // we will check if the user if following , then only we will unfollow

     const isFollowing = await followModel.findOne({
        follower:followerUsername,
        followee:followeeUsername
     })
     if(!isFollowing){
        res.status(200).json({
            "message":"You are not following " + followeeUsername
        })
     }

     await followModel.findByIdAndDelete(isFollowing._id)

     res.status(200).json({
        "message":"You have unfollowed" + followeeUsername
     })
}


// here is the controller to get all data of the follow model
async function getAllData(req,res){
    const response = await followModel.find().populate('followee')
    res.status(200).json({
        "message":"This is the data of all the user",
        response
    })
}



module.exports = {
    followController,
    unfollowController,
    getAllData
}