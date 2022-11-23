const express = require("express");
const nt = require("./SendRequest.js"); 

const mongoose = require("mongoose"); 
const UserModel = mongoose.model("User")
const settingsRouter = express.Router();

settingsRouter.post("/settings/update", (req, res) => {
    res.header.add("Access-Control-Allow-Origin", "*");
    res.header.add("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    res.header.add("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Authorization, Origin, Accept");
    // Database Interaction Here 
    const newData = {
        "username" : req.body.username.trim(), 
        "email" : req.body.email.trim(), 
        "passwordHash" : req.body.password.trim() === "" ? req.user.passwordHash : req.body.password.trim(),
    }

    UserModel.findOneAndUpdate({_id: req.user._id}, {
        $set : newData
    }, (err, data) => {
        if (err) {
            console.log("Updating error!", err); 
            res.status(400).send({
                success: false, 
                message: "Error in updating your account!"
            })
        }

        res.status(200).json({
            success: true,
            message: "Saved details!"
        })
    })
})

settingsRouter.post("/settings/get", (req, res) => {
    return res.status(200).json({
        username: req.user.username, 
        email: req.user.email, 
        password: "", 
        confirmPassword: "", 
        passwordError: ""
    })
})

module.exports = settingsRouter; 