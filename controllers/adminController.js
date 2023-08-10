const bcrypt = require("bcryptjs");
const { asyncErrorhandler } = require("../ErrorHandler/asyncErrorHandler");
const { User } = require("../model/portfolio");
const jwt = require("jsonwebtoken");

require("dotenv").config();





module.exports.adminUpdate = asyncErrorhandler(async (req, res) =>{
const username = req.params.username;
const user = await User.findOne({username})
if(!user) return res.json({data : null, message:"No user found", success:false})
const{role, approved} = req.body
if(role){
    user.role = role
}
if (approved){
    user.approved = approved
}
const updatedUser = await user.save()
return res.json({data: updatedUser, message : "Update Successful", success : true})
})


// ADMIN ROLE: UNAPPROVED USERS
module.exports.unapprovedUsers = asyncErrorhandler(async (req,res)=>{
const allUser = await User.find({approved: false}, "-name -username -intro", );
res.json({data: allUser, success: true})
})

