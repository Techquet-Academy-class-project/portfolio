const express = require("express");
const router = express.Router();
router.use(express.json());
const {adminUpdate, unapprovedUsers}= require("../controllers/adminController")
const { isAdmin} = require("../middleware/authorisation");




//UNAPPROVED USERS 
router.get("/users/unapproved", isAdmin, unapprovedUsers);

// UPDATE USERS
router.put("/users/:username", isAdmin, adminUpdate);


module.exports = router;
