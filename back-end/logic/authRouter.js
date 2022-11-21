const express = require('express');
const router  = express.Router();
const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');
const passport = require("passport"); 
const { jwtOptions } = require('./authPassport');

const authRouter = express.Router(); 

authRouter.post("/login", (req, res, next) => {
    const email = req.body.email
    const password = req.body.password

    console.log("Entred data", email, password)

    // no username or password 
    if (!email || !password) {
        res.status(401)
            .json({ success: false, message: `no username or password supplied.` })
    }

    // find user 
    const UserFinder = mongoose.model("User"); 
    UserFinder.findOne({"email" : email}).exec((err, data) => {
        console.log(data); 
        if (err) {
            res.status(401)
                .json({ success: false, message: `User not found.`})
        }

        if (password != data.passwordHash) {
            res.status(401)
                .json({ success: false, message: `Incorrect Credentials.`})
        }

        const payload = {_id: data._id, email: data.email}; 
        const token = jwt.sign(payload, jwtOptions.secretOrKey); 
        res.json({success: true, token: token}); 
        next(null, true); 
    })

}); 


module.exports = authRouter; 