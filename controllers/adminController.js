const bcrypt = require("bcryptjs");
const { asyncErrorhandler } = require("../ErrorHandler/asyncErrorHandler");
const { User } = require("../model/portfolio");
const jwt = require("jsonwebtoken");

require("dotenv").config();
