const mongooge = require('mongoose');

const postSchema = new mongooge.Schema({
    caption:{
        type:String,
        default:""
    },
    imageUrl :{
        type:String,
        required:[true,"imageUrl is required to create the image"]
    },
    user:{
        ref:"users",
        type:mongooge.Schema.Types.ObjectId,
        required :[true,"userId is required for createing a post"]

    }
})

const postModel = mongooge.model("posts",postSchema);


module.exports = postModel;