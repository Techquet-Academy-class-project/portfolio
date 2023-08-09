const express = require ("express")
const app = express()

const {signup, login, logout, getAllUser, oneUser} = require("./controllers/users")

app.use("/users", signup)
app.use("/users", login)
app.use("/users", logout)
app.use("/users", getAllUser)

app.use("/users", oneUser)



app.listen(4040, console.log("Server is running on 4040"));
