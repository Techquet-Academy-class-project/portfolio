const { asyncErrorhandler } = require("../ErrorHandler/asyncErrorHandler");
const { User } = require("../model/portfolio");
const jwt = require("jsonwebtoken");

module.exports.isAuthorized = asyncErrorhandler(async (req, res, next) => {
  //check if token exist
  const token = req.cookies.authorization;
  
  if (!token)
    return res.status(401).json({
      message: "Authentication failed, please log in",
      success: true,
      data: null,
    });

    //check if token is valid
    const decodedData = jwt.verify(token, process.env.JWTSECRET);
    

    //fetching back the user contained in the token
    const user  = await User.findById(decodedData._id, "-password")
    const iat = decodedData.iat * 1000
    const newUpdate = new Date(user.createdOn).getTime();
    if (iat < newUpdate)return res.status(401).json({message: "Authentication failed", success:false})
    

    //check if user exist
      if (!user)
        return res.json({
          data: user,
          message: "No user found",
          success: false,
        });
    req.user = user
    next()
});


//Checking if it's admin
module.exports.isAdmin =asyncErrorhandler(async (req, res,next) =>{
  const token = req.cookies.authorization;

  if (!token)
    return res.status(401).json({
      message: "Authentication failed, please log in",
      success: true,
      data: null,
    });

  //check if token is valid
  const decodedData = jwt.verify(token, process.env.JWTSECRET);

  //fetching back the user contained in the token
  const user = await User.findById(decodedData._id);

  if(!user || user.role !== "admin"){
    return res
      .status(403)
      .json({ message: "Access denied. You are not an admin", success: false });
  }

   req.user = user;
   next();
})
