const fs = require("fs/promises")
const { error } = require("console");
const jwt = require("jsonwebtoken")


// CHECKING IF USER IS AUTHENTICATED
module.exports.authorized = (async function(req,res,next){
try{
const token = req.cookies.authorisation;
if(!token) return res.json({message : "Authentication failed, please log in!", success : false, data : null});
const decodedData = jwt.verify(token, process.env.SecretKey);
const readUsers =  JSON.parse(await fs.readFile(__dirname + "/./database/db.json", "utf-8"));
const findUser = readUsers.find(user => user._id === decodedData._id )
if(!findUser) return res.json({data: null, message : "No user found", success : false})
const noPassword = {...findUser};
delete noPassword.password;
const iat = decodedData.iat * 1000;
const update = new Date(findUser.lastChangedPassword).getTime();
if(iat < update) return res.status(401).json({message: "Authorization failed!!!", success: false})
req.user = noPassword;
next()
}catch (err){
return res.json({data: null, message : err.message, success : false})
}
})


// CHECKING ADMIN-USER
const role = {
  ADMIN: 'admin',
  USER: 'user'
};
const adminROLE = role.ADMIN

// if (adminROLE === role.ADMIN) {
//   console.log(`%#`, 'User is an admin.');
// } else (userRole === role.USER) {
//   console.log(`@!`, 'User is a regular user.');
// } 

module.exports.checkAdmin = (async function(req, res, next){
const token = req.cookies.authorisation
if(!token) return res.status(401).json({message: "Authentication failed, please log in!", success : false, data : null});
const decodedData = jwt.verify(token, process.env.SecretKey);
const readUsers =  JSON.parse(await fs.readFile(__dirname + "/./database/db.json", "utf-8"));
const findUser = readUsers.find(user => user._id === decodedData._id )
if( !findUser || findUser.role !== adminROLE) return res.json({data: null, message : "Access denied. You are not an admin", success : false});
req.user = findUser;
next();
}) 

