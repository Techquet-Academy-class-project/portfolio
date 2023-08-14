const express = require ("express")
const app = express()
const cookieParser = require("cookie-parser")


const {signup, login, logout, getAllUsers, oneUser, profile, editUser, changePassword, unapprovedUser, updateUser} = require("./controllers/users")

app.use(cookieParser());

app.use("/users", signup)
app.use("/users", login)
app.use("/users", logout)
app.use("/users", getAllUsers)
app.use("/users", profile)
app.use("/users", editUser)
app.use("/users", changePassword)
app.use("/users", unapprovedUser)
app.use("/users", updateUser)
app.use("/users", oneUser)



app.listen(4040, console.log("Server is running on 4040"));
