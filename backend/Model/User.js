const mongoose = require("mongoose");
//import validator package to validate the email
const validatorPackage = require("validator");

//Create a schema using mongoose
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    require: [true, "Please provide email"],
    unique: [true, "This email is already used"],
    validate: {
      validator: validatorPackage.isEmail,
      message: "Please provide valid email",
    },
  },
  username: {
    type: String,
    require: [true, "Please provide username"],
    minlength: [3, "Your username must longer than 3 characters"],
    maxlength: [25, "Your is too long, it must under 25 characters"],
    trim: true,
  },
  birthday: {
    type: Date,
    require: [true, "Please provide your date of birth"],
    trim: true,
  },
  role: {
    type: String,
    enum: ["admin", "user", "premium", "artist"],
    default: "user",
  },
  //làm gì còn giới tính nào khác nữa?
  gender: {
    type: String,
    enum: ["male", "female", "others"],
  },
  follower: {
    type: Number,
    default: 0,
  },
});
