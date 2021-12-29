const mongoose = require("mongoose");
const { isEmail } = require("validator")

//User Schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: [6, "Minimum password length is 6 characters"]
    }
})

//Create model based on schema
const User = mongoose.model("user", userSchema);

//Export model
module.exports = User;