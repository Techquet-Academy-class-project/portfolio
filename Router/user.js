const express = require("express")
const {createUser, getAllUsers, getApprovedUsers,getAUser,getMyProfile} = require("../controllers/userController")
const router = express.Router()
const {isAuthorized} = require("../middleware/authorisation")

router.use(express.json())



//get all user
router.get("/", getAllUsers)

//get approved user
router.get("/approved" , getApprovedUsers)

//get my profile
router.get("/myprofile" , isAuthorized, getMyProfile)

//get a user
router.get("/:username", getAUser)




module.exports =  router