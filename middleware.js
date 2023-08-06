const {asyncErrHandler} = require("./errorHandler/asyncErrHandler");
const jwt = require("jsonwebtoken");
const {Portfolio} = require("./model");

module.exports.authorized = asyncErrHandler(async function(req,res,next){
const token = req.cookies.authorization;
if(!token) return res.json({message : "Authentication failed, please log in!", success : false, data : null});
const decodedeData = jwt.verify(token, process.env.SecretKey);
const user = await Portfolio.findById({_id: decodedeData._id}, "-password");
const iat = decodedeData.iat * 1000;
const update = new Date(user.createdOn).getTime();
if(iat < update) return res.status(401).json({message: "Authorization failed!!!", success: false})
if(!user) return res.json({data: null, message : "No user found", success : false});
req.user = user;
next()
})