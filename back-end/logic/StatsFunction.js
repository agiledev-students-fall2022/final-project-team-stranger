const express=require("express")
const StatsRouter = express.Router();
const axios=require("axios")
const mongoose = require("mongoose"); 
const db = require("../models/db.js")
const User = mongoose.model("User"); 
const Message = mongoose.model("Message"); 


const findObject = (value) => {
  return User.find({email: value}).exec();
}


StatsRouter.post("/stats",  async (req,res) =>{
    res.header("Access-Control-Allow-Origin", "*");
    try{
      const em=req.body.email;
      let apiResponse= await findObject(em);
      let author=apiResponse[0]._id
      Message.
        find({created_by:author}).
        exec((err,data)=>{
            if(err)
            {
              console.log(err);
            }
            else
            {
              res.json(data);
            }
          }
        )
    } catch(err){
      console.log(err);
      res.json(err)
    }
})

module.exports = StatsRouter