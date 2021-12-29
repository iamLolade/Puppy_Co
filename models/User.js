const mongoose = require("mongoose");

//User Schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
})

//Create model based on schema
const User = mongoose.model("user", userSchema);

//Export model
module.exports = User;