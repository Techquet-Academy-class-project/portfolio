const express = require("express");
const router = express.Router();
router.use(express.json());
const { createUser, login , logout, changePassword} = require("../controllers/authController");

// create a user
router.post("/signup", createUser);

//create a login route
router.post("/login", login);

//create a logout route
router.get("/logout", logout);

//change password
router.post("/changepassword", changePassword)

module.exports = router;
