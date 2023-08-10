const express = require("express")
const mongoose = require("mongoose")
const {User} =require("./model/portfolio")
const userRouter = require("./Router/user")
const authRouter = require("./Router/auth")
const adminRouter = require("./Router/admin")

const cors = require("cors")
const cookieParser =require("cookie-parser")

const app = express()
app.use(cors())
app.use(cookieParser())

app.use("/user", userRouter)
app.use("/auth", authRouter)
app.use("/admin", adminRouter)



PORT = process.env.PORT || 4000

app.listen(PORT, ()=> console.log("app is running at port 4000"))