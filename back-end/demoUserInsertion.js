const mongoose = require("mongoose"); 

const User = mongoose.model("User"); 
const newUser = new User({
  username: "John Smith", 
  email: "john@google.com", 
  passwordHash: "hello", 
  currentMessages: [], 
  previousMessages: []
})

newUser.save(err => {
  console.log("There was an error!", err)
});