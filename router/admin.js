const express = require("express");
const router = express.Router();
const {Portfolio} = require("../model");
const { unapprovedUsers, updateUser } = require("../controllers/adminControl");
const {checkAdmin} = require("../middleware");


router.use(express.json());


//UNAPPROVED USERS 
router.get("/users/unapproved", checkAdmin, unapprovedUsers);

// UPDATE USERS
router.put("/users/:username", checkAdmin, updateUser);


module.exports = router;