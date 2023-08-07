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
    const user  = await User.findById(decodedData._id)
    

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
