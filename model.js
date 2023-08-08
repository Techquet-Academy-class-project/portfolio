const mongoose = require("mongoose");

const roleEnum = ["admin","user"];

const portfolioSchema = new mongoose.Schema({
 name : {type: String, required: true},
 email : {type: String, required: true, unique: true},
 username : {type: String, required: true, unique: true},
 password : {type: String, required: true, minLength: 6},
 createdOn : {type: Date, default: Date.now},
 intro : {type: String, maxLength: 100},
 about : {type: String, maxLength: 1000},
 tools : [{type: String}],
 howManyMonthsProgramming : {type: Number},
 favoriteMealInTechquestProgram : {type: String},
 favoriteQuote : {type: String},
 role : {type: String, enum: roleEnum, default: "user"},
 lastChangedPassword: {type: Date, default: Date.now},
 approved : {type: Boolean, default: false}
});


const Portfolio = new mongoose.model ("portfolio", portfolioSchema);


mongoose.connect("mongodb://127.0.0.1:27017/portfolio")
.then(() => console.log("portfolio database is running"));

module.exports = {Portfolio, roleEnum}