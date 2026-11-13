const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"Username already exist"],
        required:[true,"Username is requied"]
    },
    email:{
        type:String,
        unique:[true,"email already exist"],
        required:[true,"email is requied"]

    },
    password :{
        type:String,
        unique:[true,"password already exist"],
        required:[true,"password is requied"],
        select :false
    },
    bio:String,
    profileImage:{
        type:String,
        default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShJ4TyHP_GSKlapN06AqMy0-kUnXYiOl45QhDerECuBA&s'
    }
})

const userModel = mongoose.model('users',userSchema);


module.exports = userModel;