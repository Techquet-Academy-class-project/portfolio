const {Portfolio} = require("../model");
const {asyncErrHandler} = require("../errorHandler/asyncErrHandler");
const bcrypt = require ("bcrypt");
const jwt = require ("jsonwebtoken");
require("dotenv").config();



// SIGNUP ROUTE
module.exports.signUp = asyncErrHandler(async (req,res)=>{
 const {password, ...others} = req.body;
 if(password.length < 6) return res.json({message: "Password length must be more than 6 characters", success: false});
 const hashedPassword = await bcrypt.hash(password, 4);
 const newUser = await Portfolio.create({...others, password: hashedPassword});
const token = jwt.sign({_id : newUser._id}, process.env.SecretKey);
res.cookie("authorization", token);
return res.json({data: newUser, message: "New user created succesfully", success: true})
})


// LOGIN ROUTE
module.exports.login = asyncErrHandler(async(req,res)=>{
 const {username,password} = req.body;
 const user = await Portfolio.findOne({username});
 if(!user) return res.json({data: null, message:"User not found", success: false});
 const check = await bcrypt.compare(password, user.password);
 if(!check) return res.json({data: null, message: "Authentication error", success: false});
 const token = jwt.sign({_id : user._id}, process.env.SecretKey);
res.cookie("authorization", token);
return res.json({data: user, message: "Welcome, login successful", success: true})
})


// LOG-OUT
module.exports.logout = asyncErrHandler(async (_, res)=>{
 res.cookie("authorization", "", {maxAge : 1})
 return res.json({message: "You have successfully logged out", success: true})
})


