const express = require("express");
const app = express();
const {Portfolio} = require("./model")
const portfolioRouter = require("./router/portfolio")
const authRouter = require("./router/auth")
const bcrypt = require ("bcrypt");
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser");

app.use(cookieParser());

app.use("/users", portfolioRouter);
app.use("/auth", authRouter);

const PORT = process.env.PORT || 4555
app.listen(PORT, console.log("Server is running on 4555"))