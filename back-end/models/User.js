const mongoose =require( "mongoose");
const bcrypt = require("bcrypt"); 

const User = new mongoose.Schema(
    {
        username: {
            type: String, 
            required: true 
        }, 

        passwordHash: {
            type: String, 
            required: true 
        }, 

        email: {
            type: String, 
            required: true
        }, 

        // array of current messages that the user has - reference documents
        // to populate (fill array with the right message), 
        // refer to the following https://mongoosejs.com/docs/populate.html
        currentMessages: [
            {
                type: mongoose.Schema.Types.ObjectId, 
                ref : "Message"
            }
        ], 

        previousMessages: [
            {
                type: mongoose.Schema.Types.ObjectId, 
                ref : "Message"
            }
        ], 
        lastRefreshDate: {
                type: mongoose.Schema.Types.Date, 
                required: true 
        }

    }, 

    // refer to https://mongoosejs.com/docs/timestamps.html
    {
        timestamps: true 
    }
)

User.methods.isValidPassword = (password) => {
    const user = this; 
    const compare = bcrypt.compareSync(password, user.passwordHash); 
    return compare; 
}

mongoose.model("User", User);
module.exports = User