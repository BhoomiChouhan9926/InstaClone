const userModel = require('../models/user.model.js')
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcrypt');



async function registerController(req,res){
    const {username,email,password,bio,profileImage}= req.body;

    // finding if userAlready exist on the basis of username and email
    const IsUserAlreadyExist = await userModel.findOne({
        $or :[
           { username},
           { email}
        ]
    })
    // if user exist then return user already exist
    if(IsUserAlreadyExist){
        return res.status(409).json({
            "message":"User Already Exist" +( IsUserAlreadyExist.email === email ?"Email Already exist":"Username already exist")
        })
    }
    // agar user exist nahi krta then create a user
    const hash = await bcrypt.hash(password,10);
    const user = await userModel.create({
        username,email,password:hash,bio,profileImage
    })

    // agar user exist nahi krta then create a token
    const token = jwt.sign({
        id:user._id,
         username:user.username,
    },process.env.JWT_SECRET,{expiresIn:'1d'})

    // when token created store it in cookies storage
    res.cookie("token",token);

    res.status(201).json({
        "message":"User created succesfully",
        user
    })

}






async function loginController(req,res){
    const {username,email,password} = req.body;

    // find the user 
    const user = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    }).select("+password")
    if(!user){
    return res.status(404).json({
        "message":"User not found"
    })
}
// if user exist then we will check the password
 //const hash = crypto.createHash('sha256').update(password).digest("hex")

 const IspasswordValid = await bcrypt.compare(password,user.password);

 if(!IspasswordValid){
    return res.status(401).json({
        "message":"Invalid Password"
    })
 }
 // if password is valid then we will crae the token and save it at the cookies storage
 const token = jwt.sign({
        id:user._id,
        username:user.username,
    },process.env.JWT_SECRET,{expiresIn:'1d'})

    // when token created store it in cookies storage
res.cookie("token",token);

res.status(200).json({
    "message":"Logged in successfully",
    user
})



}

async function getMeController(req,res){
    const userId = req.user.id;
    const user = await userModel.findById(userId);


    res.status(200).json({
      user : {
        username : user.username,
        email :user.email,
        bio : user.bio,
        profileImage : user.profileImage
      }
    })

}


module.exports = {
    registerController,
    loginController,
    getMeController
}