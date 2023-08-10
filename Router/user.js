const express = require("express")
const {createUser, getAllUsers, getApprovedUsers,getAUser,getMyProfile, updateAUser} = require("../controllers/userController")
const router = express.Router()
const {isAuthorized} = require("../middleware/authorisation")

router.use(express.json())



//get all user
router.get("/", getAllUsers)

//get approved user
router.get("/approved" , getApprovedUsers)

//get my profile
router.get("/profile" , isAuthorized, getMyProfile)

//get a user
router.get("/:username", getAUser)

// update a profile
router.put("/:_id", isAuthorized, updateAUser)




module.exports =  router