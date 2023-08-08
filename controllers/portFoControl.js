const {Portfolio} = require("../model");
const {asyncErrHandler} = require("../errorHandler/asyncErrHandler")
const bcrypt = require("bcrypt");


// GET ALL APPROVED USERS
module.exports.getAllUsers = asyncErrHandler(async (req,res)=>{
 const allUser = await Portfolio.find({approved: true}, "-name -username -intro", );
 res.json({data: allUser, success: true})
})

// GET ALL USERS
// module.exports.getAllUsers = asyncErrHandler(async (req,res)=>{
//  const allUser = await Portfolio.find({}, "-name -username -intro -password -lastChangedPassword" );
//  res.json({data: allUser, success: true})
// })


// GET A USER
module.exports.getAUser = asyncErrHandler(async (req,res)=>{
 const username = req.params.username
 const user = await Portfolio.findOne({username}, "-password");
 res.json({data: user, success: true})
})


// USER'S PROFILE
module.exports.userProfile = asyncErrHandler(async (req,res)=>{
// console.log(req.user);
return res.json({data: req.user, message : "This is your profile", success : true})
})


// EDIT USER PROFILE
module.exports.editUser = asyncErrHandler(async (req,res)=>{
const { intro, about, tools, howManyMonthsProgramming, favoriteMealInTechquestProgram, favoriteQuote } = req.body;
if(intro) req.user.intro = intro;
if(about) req.user.about = about;
if(tools) req.user.tools = tools;
if(howManyMonthsProgramming) req.user.howManyMonthsProgramming = howManyMonthsProgramming;
if (favoriteMealInTechquestProgram) req.user.favoriteMealInTechquestProgram = favoriteMealInTechquestProgram;
if(favoriteQuote) req.user.favoriteQuote = favoriteQuote;
const updatedUser = await req.user.save();
return res.json({data: updatedUser, message: "Update successful", success: true });
})


// CHANGE PASSWORD
module.exports.changePassword = asyncErrHandler(async (req,res)=>{
if(req.body.password.length < 6) return res.status(401).json({message: "Password must be greater than 6", success: false})
const hashedPassword = await bcrypt.hash (req.body.password, 4);
await Portfolio.updateOne ({_id: req.user._id}, {password: hashedPassword, lastChangedPassword: Date.now()})
return res.status(200).json({message: "Password successfully updated", success: true})
})

