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

    // no username or password 
    if (!email || !password) {
        return res.status(401)
            .json({ success: false, message: `no username or password supplied.` })
    }

    // find user 
    const UserModel = mongoose.model("User"); 
    UserModel.findOne({"email" : email}).exec((err, data, info) => { 
        if (err || !data) {
            res.status(401)
                .json({ success: false, message: `User not found.`})
        } else if (password != data.passwordHash) {
            res.status(401)
                .json({ success: false, message: `Incorrect Credentials.`})
        } else {
            const payload = {_id: data._id, email: data.email}; 
            const token = jwt.sign(payload, jwtOptions.secretOrKey); 
            res.json({success: true, token: token}); 
            next(null, true); 
        }
    })

}); 

authRouter.post("/signup", (req, res, next) => {
    const refreshDate = new Date()
    refreshDate.setDate(refreshDate.getDate()-2);

    const UserModel = mongoose.model("User"); 
    const newUser = new UserModel({
        username: req.body.username, 
        passwordHash: req.body.password, 
        email: req.body.email, 
        currentMessages: [], 
        previousMessages: [], 
        lastRefreshDate: refreshDate
    }); 

    newUser.save((err, data, info) => {
        if (err) {
            console.log("User signup fail!", err, info)
            res.status(401)
                .json({success: false, message: `User not found.`})
        } else {
            console.log("User signup success!")
            const payload = {_id: data._id, email: data.email}; 
            const token = jwt.sign(payload, jwtOptions.secretOrKey); 
            res.json({success: true, token: token}); 
            next(null, true); 
        }
    }); 
})

// Add authFail endpoint 
authRouter.get("/authFail", (req, res) => {
    res.status(400).json({
        success: false,
        message: "Authentication failed."
    })
})

module.exports = authRouter; 