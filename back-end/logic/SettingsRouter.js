const express = require("express");
const nt = require("./SendRequest.js"); 
const mongoose = require("mongoose"); 
const UserModel = mongoose.model("User")
const SettingsRouter = express.Router();

SettingsRouter.post("/settings/update", (req, res) => {
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

SettingsRouter.post("/settings/get", (req, res) => {
    return res.status(200).json({
        username: req.user.username, 
        email: req.user.email, 
        password: "", 
        confirmPassword: "", 
        passwordError: ""
    })
})

module.exports = SettingsRouter; 