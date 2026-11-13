const jwt = require('jsonwebtoken');

async function IdntifyUser(req,res,next){
       const token = req.cookies.token;
    // agar token nahi hai tho unauthorized access
    if(!token) {
        return res.status(401).json({
            "message":"Token not provided Unauthorized access"
        })
    }
    // jb token mai fortury ki gayi ho tho jwt .verify ek errory deti hai
    let decoded = null;
    try{
 decoded = jwt.verify(token,process.env.JWT_SECRET);
    }catch{
         return res.status(401).json({
            "message":"Unauthorized user"
        })

    }

    req.user = decoded;
    next();
}


module.exports = IdntifyUser;