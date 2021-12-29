const User = require("../models/User");

//handle errors
const handleErrors = (error) => {
    console.log(error.message, error.code);
    let errors = { email: "", password: "" };

    //duplicate error
    if(error.code === 11000) {
        errors.email = "Email already in use";
        return errors
    }

    //Validation errors
    if(error.message.includes("user validation failed")) {
        Object.values(error.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        })
    }

    return errors
}

module.exports.signup_get = (req, res) => {
    res.render("signup");
}

module.exports.login_get = (req, res) => {
    res.render("login");
}

module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body;
    //Create new user
    try {

        const user = await User.create({ email, password });
        res.status(201).json(user)

    } catch (error) {
        const err = handleErrors(error);
        res.status(400).json(err)
    }
}


module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;

    console.log(email, password);
    res.send("Welcome");
}