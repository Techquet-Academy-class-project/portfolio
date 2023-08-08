const mongoose =require("mongoose")
require("dotenv").config()

const portfolioSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name must be provided"] },
  email: {
    type: String,
    required: [true, "Email must be provided"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "username must be provided"],
    unique: true,
  },
  password: {
    type: String,
    minLength: [4, "cannot save {VALUE} in {PATH}"],
    required: [true, "Password must be provided"],
  },
  createdOn: { type: Date, default: Date.now },
  intro: { type: String, maxLength: 100 },
  about: { type: String, maxLength: 1000 },
  tools: { type: [String] },
  howManyMonthsProgramming: Number,
  favoriteMealInTechquestProgram: String,
  favoriteQuote: String,
  role: {type:String, enum: ["admin", "user"], default: "user" },
  lastChangedPassword: { type: Date, default: Date.now },
  approved: Boolean,
}); 

module.exports.User = new mongoose.model("user", portfolioSchema)

mongoose.connect(process.env.MONGODBURL).then(()=> console.log("database is running"));