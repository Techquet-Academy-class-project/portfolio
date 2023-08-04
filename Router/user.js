const express = require("express")
const {createUser} = require("../controllers/userController")
const router = express.Router()

router.use(express.json())

router.post("/register", createUser)


module.exports =  router