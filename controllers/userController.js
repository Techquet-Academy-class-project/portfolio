const bcrypt =require("bcryptjs")
const { asyncErrorhandler } = require("../ErrorHandler/asyncErrorHandler")
const { User } = require("../model/portfolio")
const jwt = require("jsonwebtoken")
const fs = require("fs");
require("dotenv").config()


module.exports.createUser = asyncErrorhandler(async(req, res) =>{
  const {password, ...others } = req.body;
   if (password.length < 7 )
     return res.json({ message: "Password should be greater than 6" });

  const salt = await bcrypt.genSalt(3);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = { password: hashedPassword, ...others };
  const user = await User.create(newUser);
  // after user has succefully been created now we want to create a token
  // we want create a token to identify this user across our application:
  // jwt create token using sign
  const token = jwt.sign({ _id: user._id }, process.env.JWTSECRET);
  res.cookie("authorisation", token)
  return res.json ({data: user, message: "new user created"})
})