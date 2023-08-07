const {Portfolio, roleEnum} = require("../model");
const {asyncErrHandler} = require("../errorHandler/asyncErrHandler")
const bcrypt = require("bcrypt");


// ADMIN ROLE: UNAPPROVED USERS
module.exports.unapprovedUsers = asyncErrHandler(async (req,res)=>{
const allUser = await Portfolio.find({approved: false}, "-name -username -intro", );
res.json({data: allUser, success: true})
})