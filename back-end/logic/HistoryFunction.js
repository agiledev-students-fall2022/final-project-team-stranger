
const express = require("express")
const HistoryRouter = express.Router();
const axios=require("axios")
const mongoose = require("mongoose"); 
const db = require("../models/db.js")
const User = mongoose.model("User"); 
const Message = mongoose.model("Message"); 


function downsort(propertyName) {
      return function(object1, object2) {
        var value1 = object1[propertyName];
        var value2 = object2[propertyName];
        return value2.toString().localeCompare(value1.toString());
      }
    }
HistoryRouter.post("/history", async(req,res) =>{
    try{
      const em=req.body.email;
      let apiResponse;
      User.
          find({email:em}).
          populate("previousMessages").
          exec((err,data)=>{
            if(err){
              console.log(err);
            }
            else{
              apiResponse=data[0].previousMessages
              apiResponse.sort(downsort("createdAt"))
              console.log(apiResponse)
              res.json(apiResponse)
            }
          })
    } catch(err){
      console.log(err);
      res.json(err)
    }
})

module.exports=HistoryRouter