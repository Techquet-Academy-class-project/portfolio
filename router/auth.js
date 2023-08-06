const express = require("express");
const router = express.Router();
const {Portfolio} = require("../model");
const {signUp, login, logout} = require("../controllers/authControl");

router.use(express.json());


//SIGN-UP 
router.post("/signup", signUp);

// LOGIN
router.post("/login", login);

// LOG-OUT
router.post("/logout", logout);






module.exports = router;