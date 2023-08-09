const express = require ("express")
const app = express()
// const fs = require ("fs")
// const {v4: uuidv4} = require ("uuid")
const {signup, login, logout, getAllUser, oneUser} = require("./controllers/users")

app.use("/users", signup)
app.use("/users", login)
app.use("/users", logout)
app.use("/users", getAllUser)

app.use("/users", oneUser)



app.listen(4040, console.log("Server is running on 4040"));




// signup route
// app.post("/signup",express.json(), function(req,res){
//  const {name, username, email, password, intro, about, tools, howManyMonthsProgramming, favoriteMealInTechquestProgram, favoriteQuote, role, lastChangedPassword, approved} =req.body;
//  if(!name || !username || !email || !password){
//   return res.status(400).json({
//    message: `name, username, email and password fields are required`, success: false
//   })
//  }
// if(password.length < 6) return res.status(400).json({message: `Password length must be more than 5 characters`, success:`true`})
// const readUsers =  JSON.parse(fs.readFileSync(__dirname + "/database/db.json", "utf-8"))
// const user =  readUsers.find(user => user.username === username)
// if(user) return res.status(400).json({message: `user already exist`, success: false})
// readUsers.push({...req.body, _id: uuidv4()})
// fs.writeFileSync(__dirname + "/database/db.json", JSON.stringify(readUsers))
// res.status(201).json({success: true, message:`New user created succesfully`})
// })
