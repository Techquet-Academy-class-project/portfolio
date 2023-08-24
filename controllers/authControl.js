const {Portfolio} = require("../model");
const {asyncErrHandler} = require("../errorHandler/asyncErrHandler");
const bcrypt = require ("bcrypt");
const jwt = require ("jsonwebtoken");
require("dotenv").config();

// const express = require ("express");
// const app = express();
// const hbs = require ("hbs");
// const path = require ("path");

// const templatesPath = path.join(__dirname, "../templates")

// app.use(express.static("public"));
// app.use(express.json());
// app.use(express.urlencoded({extended: false}))
// app.set("view engine", "hbs");
// app.set("views", templatesPath);

// SIGNUP ROUTE
module.exports.signUp = asyncErrHandler(async (req,res)=>{
 const {password, ...others} = req.body;
 if(password.length < 6) return res.json({message: "Password length must be more than 5 characters", success: false});
 const hashedPassword = await bcrypt.hash(password, 4);
 const newUser = await Portfolio.create({...others, password: hashedPassword});
const token = jwt.sign({_id : newUser._id}, process.env.SecretKey);
// Set the token as a cookie (Storing the token)
res.cookie("authorization", token);
// To pop up alert message on the client side
if (newUser) {
const script = "<script>alert('Registration Successful, Please Login To Continue'); window.location.href = '/login' </script>";
res.send(script);
} else {
const script = "<script>alert('Registration failed'); window.location.href = '/signup' </script>";
res.send(script);
}
// res.redirect("/login")
// return res.json({data: newUser, message: "New user created succesfully", success: true})
})


// LOGIN ROUTE
// app.get("/login", (req,res)=>{
// res.render("login")
// })
module.exports.login = asyncErrHandler(async(req,res)=>{
 const {username,password} = req.body;
 const user = await Portfolio.findOne({username});
 if(!user) return res.json({data: null, message:"User not found", success: false});
 const check = await bcrypt.compare(password, user.password);
 if(!check) return res.json({data: null, message: "Authentication error", success: false});
 const token = jwt.sign({_id : user._id}, process.env.SecretKey);
res.cookie("authorization", token);
res.redirect("/users/profile")
// res.render("profile")
// return res.json({data: user, message: "Welcome, login successful", success: true})
})


// LOG-OUT
module.exports.logout = asyncErrHandler(async (_, res)=>{
 res.cookie("authorization", "", {maxAge : 1})
 return res.json({message: "You have successfully logged out", success: true})
})


// ADMIN LOGIN
module.exports.AdminLogin = asyncErrHandler(async(req,res)=>{
 const {username,password} = req.body;
 const user = await Portfolio.findOne({username, role: "admin"});

 if (!user) {
const script = "<script>alert('You are not an Admin. Authorization denied!'); window.location.href = '/login' </script>";
return res.send(script);
}
 // if(!user) return res.json({data: null, message:"User not found", success: false});
 const check = await bcrypt.compare(password, user.password);
 if(!check) return res.json({data: null, message: "Authentication error", success: false});
 const token = jwt.sign({_id : user._id}, process.env.SecretKey);
res.cookie("authorization", token);
res.redirect("/admin/users")
})


// ADMIN'S PROFILE  @AUTH ROUTE
module.exports.adminProfile = asyncErrHandler(async (req,res)=>{
 res.render("adminPage",{
  data: req.user
 })
})