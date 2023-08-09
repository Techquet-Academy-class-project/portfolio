const express = require ("express");
const app = express();
const fs = require ("fs/promises");
const {v4: uuidv4} = require ("uuid");
const bcrypt = require("bcrypt");
const jwt = require ("jsonwebtoken");
const cookieParser = require("cookie-parser")
require("dotenv").config();


// const defaultRole = "user";
const role = {
  ADMIN: 'admin',
  USER: 'user'
};
const userROLE = role.USER;

const defaultApproved = false;

// SIGNUP ROUTE
const signup = app.post("/signup", express.json(), async function(req,res){
 const {name, username, email, password, intro, about, tools, howManyMonthsProgramming, favoriteMealInTechquestProgram, favoriteQuote, role , lastChangedPassword, approved} =req.body;
 const userRole = role || userROLE;
 const approvedUser = approved || defaultApproved;
 if(!name || !username || !email || !password){
 return res.status(400).json({message: `name, username, email and password fields are required`, success: false
 })
 };
 if(password.length < 6) return res.status(400).json({message: `Password length must be more than 5 characters`, success: false});
 const hashedPassword = await bcrypt.hash(password, 3)
const readUsers =  JSON.parse(await fs.readFile(__dirname + "/../database/db.json", "utf-8"));
const user =  readUsers.find((user) => user.username === username || user.email === email);
if(user) return res.status(400).json({message: `username or email already exist`, success: false});
const newUser = readUsers.push({...req.body, _id: uuidv4(), password: hashedPassword, role: userRole, createdOn: new Date(), lastChangedPassword: new Date(), approved: approvedUser });
await fs.writeFile(__dirname + "/../database/db.json", JSON.stringify(readUsers));
const token = jwt.sign({_id: newUser._id}, process.env.SecretKey);
res.cookie("authorisation", token);
return res.status(201).json({success: true, message:`New user created succesfully`});
})


// LOGIN ROUTE
const login = app.post("/login", express.json(), async function(req,res){
 const usersPage = await fs.readFile(__dirname + "/../database/db.json", "utf-8")
 const user = JSON.parse(usersPage)
 const {username, password} = req.body
 const findUser = user.find((item) => item.username === username)
 // const findUser = user.find((item) => item.username === username && item.password === password)
 if(!findUser)return res.status(401).json({data: null, message: `Invalid username`});
 // console.log(findUser); 
 const check = await bcrypt.compare(password, findUser.password);
 if(!check) return res.status(401).json({data: null, message: "Authentication error", success: false});
const token = jwt.sign({_id: findUser._id}, process.env.SecretKey);
res.cookie("authorisation", token)
 return res.status(200).json({data: findUser, message: `Welcome, login successfully`})
})


// LOGOUT
const logout = app.post("/logout", express.json(), async function(_,res){
res.cookie("authorisation", "", {maxAge : 1})
 return res.json({message: "You have successfully logged out", success: true})
})


// GET ALL USER
const getAllUser = app.get("/getusers", async function(req,res){
const allUsers = await fs.readFile(__dirname + "/../database/db.json", "utf-8");
const users = JSON.parse(allUsers);
return res.json(users);
})


// GET A USER
const oneUser = app.get("/getusers/:username", async function(req,res){
const user = await fs.readFile(__dirname + "/../database/db.json", "utf-8");
const oneUser = JSON.parse(user);
const username = req.params.username
const findUser = oneUser.find(user => user.username === username )
if(!findUser) return res.status(404).json({data: null, message: `Autthorization failed`})
const noPassword = {...findUser};
delete noPassword.password; delete noPassword.intro
return res.json({data: noPassword, success: true})
})


module.exports = {signup, login, logout, getAllUser, oneUser};