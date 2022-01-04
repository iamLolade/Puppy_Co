const User = require("../models/User");
const jwt = require("jsonwebtoken");


const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    //check token existence and validity
    if(token) {
        jwt.verify(token, "caveman jwt secret", (err, decodedToken) => {
            if(err) {
                console.log(err.message);
                res.redirect("/login")
            } else {
                console.log(decodedToken);
                next();
            }
        })
    } else {
        res.redirect("/login")
    }
}

//check user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token) {
        jwt.verify(token, "caveman jwt secret", async (err, decodedToken) => {
            if(err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            } else {
                const user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        })
    } else {
        res.locals.user = null;
        next();
    }
}

module.exports = { requireAuth, checkUser };