const bcrypt = require("bcryptjs");
const { asyncErrorhandler } = require("../ErrorHandler/asyncErrorHandler");
const { User } = require("../model/portfolio");
const jwt = require("jsonwebtoken");
const fs = require("fs");
require("dotenv").config();

module.exports.createUser = asyncErrorhandler(async (req, res) => {
  const { password, ...others } = req.body;
  if (password.length < 7)
    return res.json({ message: "Password should be greater than 6" });

  const salt = await bcrypt.genSalt(3);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = { password: hashedPassword, ...others };
  const user = await User.create(newUser);
  // after user has succefully been created now we want to create a token
  // we want create a token to identify this user across our application:
  // jwt create token using sign
  const token = jwt.sign({ _id: user._id }, process.env.JWTSECRET);
  res.cookie("authorization", token);
  return res.json({ data: user, message: "new user created" });
});


module.exports.login = asyncErrorhandler(async(req, res) =>{
    const {password, username} = req.body
    const user = await User.findOne({username})
    if(!user)return res.json({success: false, message: "No user found"})
    
    //if user is found check is the password is a match
    const check = await bcrypt.compare(password, user.password)
    if(!check)return res.json({data:null, message :"Authentication fail"})

    //Once a user is found and the password is a match
    const token = jwt.sign({_id: user._id}, process.env.JWTSECRET)
    res.cookie("authorization", token)
    return res.json({data:user, message:"Successfully logged in", success:true})
    
})

module.exports.changePassword =asyncErrorhandler( async (req, res) =>{
  if(req.body.password.length < 7) return res.status(401).json({message: "Password must be greater than 6", success: false })
  
  const hashedPassword = await bcrypt.hash(password, 3);
  await User.updateOne(
    { _id: req.user._id },
    { password: hashedPassword, lastChangedPassword :Date.now()}
  );
     return res
       .status(200)
       .json({ message: "Password successfully updated!!!", success: true });
})

module.exports.logout = asyncErrorhandler(async(req, res) =>{
        res.cookie("authorization", "", { maxAge: 1 });
        return res.json({ message: "Succesfully logged out", success: true });
})

