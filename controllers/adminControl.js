const {Portfolio, roleEnum} = require("../model");
const {asyncErrHandler} = require("../errorHandler/asyncErrHandler")
const bcrypt = require("bcrypt");


// ADMIN ROLE: UPDATE USERS
module.exports.updateUser = asyncErrHandler(async (req,res)=>{
const username = req.params.username;
const findUser = await Portfolio.findOne({username})
if(!findUser) return res.json({data: null, message: "No user found", success: false})
const{ role, approved } = req.body;
 if (role) {
findUser.role = role;
}
if (approved) {
findUser.approved = approved;
}
const updatedUser = await findUser.save();
return res.json({data: updatedUser, message: "Update successful", success: true });
})


// ADMIN ROLE: UNAPPROVED USERS
module.exports.unapprovedUsers = asyncErrHandler(async (req,res)=>{
const allUser = await Portfolio.find({approved: false}, "-name -username -intro", );
res.json({data: allUser, success: true})
})