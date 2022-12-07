
const express = require("express")
const SidebarRouter = express.Router();
const mongoose = require("mongoose"); 
const db = require("../models/db.js");
const User = mongoose.model("User"); 
const Message = mongoose.model("Message"); 

SidebarRouter.post("/sidebar", async(req,res) =>{

  try{
    const ref = req.user._id;
    let apiResponse;
    User.
      find({_id:ref}).
      exec((err,data)=>{
        if(err){
          console.log(err);
        }
        else{
          let compareWith = new Date(data[0].createdAt);
          let currentTime = new Date();
          apiResponse = Math.floor((currentTime - compareWith) / 86400000)
          let ret = {
            username: data[0].username,
            joinTime: apiResponse
          }
          res.json(ret)
        }
      })
  } catch(err){
    res.json(err)
  }
})

module.exports = SidebarRouter