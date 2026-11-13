const express = require ('express');
const app = express();
const cors = require('cors')

const authRouter = require('./routes/auth.route')
const postRouter = require('./routes/post.route')
const userRouter =  require('./routes/user.route.js');

const cookieparser = require('cookie-parser');
app.use(cookieparser());
app.use(cors({
    credentials:true,
    origin:"http://localhost:5173"
}));
app.use(express.json());

// all the api created by authrouter will have the perfix
app.use("/api/auth",authRouter);

// all the api created by postRouter will have the prefix
app.use("/api/post",postRouter);

//all the api created be userRouter will have the prefix 
app.use("/api/user/",userRouter);

module.exports = app;