const bcrypt = require("bcryptjs")
const { asyncErrorhandler } = require("../ErrorHandler/asyncErrorHandler")
const { User } = require("../model/portfolio")
const jwt = require("jsonwebtoken")
const fs = require("fs");
require("dotenv").config()





module.exports.getAllUsers = asyncErrorhandler(async(req, res) =>{
    const user = await User.find()
    return res.json({data :user, success :true})
})

module.exports.getApprovedUsers = asyncErrorhandler(async (req, res) =>{
    const user = await User.find({approved:true})
    return res.json({ data: user, success: true });
})

module.exports.getAUser = asyncErrorhandler(async(req, res) =>{
  username = req.params.username
  const user = await User.findOne({username : username} ,"-password")
  return res.json({data:user, success: true})
})



// module.exports.getMyProfile = asyncErrorhandler( async(req, res) =>{
  

//     return res.json({
//       data: req.user,
//       message: "this should be your profile",
//       success: true,
//     });

// })


module.exports.getMyProfile = asyncErrorhandler(async (req, res) => {
const userWithoutPassword = {
  _id: req.user._id,
  name: req.user.name,
  email: req.user.email,
  username: req.user.username,
  intro: req.user.intro,
  about: req.user.about,
  tools: req.user.tools,
  howManyMonthsProgramming: req.user.howManyMonthsProgramming,
  favoriteMealInTechquestProgram: req.user.favoriteMealInTechquestProgram,
  favoriteQuote: req.user.favoriteQuote,
  role: req.user.role,
  approved: req.user.approved,
  createdOn: req.user.createdOn,
  lastChangedPassword: req.user.lastChangedPassword,
};

  return res.json({
    data: userWithoutPassword,
    message: "This should be your profile",
    success: true,
  });
});