const express = require("express");
const router = express.Router();
const {Portfolio} = require("../model");
const {getAllUsers, getAUser, userProfile, changePassword, editUser} = require("../controllers/portFoControl");
const {authorized} = require("../middleware");
const bcrypt = require("bcrypt");

router.use(express.json());


// GET ALL USERS
router.get("/", getAllUsers);

// USER'S PROFILE
router.get("/profile", authorized, userProfile);

// CHANGE PASSWORD
router.put("/settings", authorized ,changePassword);

// router.put("/profile", authorized ,editUser);

// GET ONE USER
router.get("/:username", getAUser);


module.exports = router;