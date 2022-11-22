const mongoose = require("mongoose");

const Message = new mongoose.Schema(
    {
        // who created the message? 
        created_by: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User", 
            required: true 
        }, 

        // content of the message 
        content: {
            type: String, 
            required: true
        }, 

        // how many times has this message been sent? 
        frequency: {
            type: Number, 
            required: true 
        },
    }, 

    // refer to https://mongoosejs.com/docs/timestamps.html
    { 
        timestamps: true     
    }
)

mongoose.model("Message", Message); 
module.exports = Message