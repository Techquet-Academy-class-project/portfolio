const express = require("express");
const router = express.Router();
const {Portfolio} = require("../model");
const { unapprovedUsers } = require("../controllers/adminControl");
const {checkAdmin} = require("../middleware");


router.use(express.json());


//UNAPPROVED USERS 
router.get("/users/unapproved", checkAdmin, unapprovedUsers);


module.exports = router;