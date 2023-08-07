const {asyncErrHandler} = require("./errorHandler/asyncErrHandler");
const jwt = require("jsonwebtoken");
const {Portfolio} = require("./model");

module.exports.authorized = asyncErrHandler(async (req,res,next)=>{
const token = req.cookies.authorization;
if(!token) return res.json({message : "Authentication failed, please log in!", success : false, data : null});
const decodedData = jwt.verify(token, process.env.SecretKey);
const user = await Portfolio.findById({_id: decodedData._id}, "-password");
const iat = decodedData.iat * 1000;
const update = new Date(user.createdOn).getTime();
if(iat < update) return res.status(401).json({message: "Authorization failed!!!", success: false})
if(!user) return res.json({data: null, message : "No user found", success : false});
req.user = user;
next()
})

module.exports.checkAdmin = asyncErrHandler(async (req, res, next)=>{
 const token = req.cookies.authorization;
 // console.log(token);
 if (!token) return res.status(401).json({ error: 'Not authenticated.' });
 const decodedToken = jwt.verify(token, process.env.SecretKey);
 // console.log(decodedToken);
 const userId = {_id: decodedToken._id}
 const user = await Portfolio.findById(userId);
 console.log(user);
 if (!user || user.role !== 'admin') {
  return res.status(403).json({ message: "Access denied. You are not an admin", success: false });
 }
 req.user = user;
 next();
}
)
