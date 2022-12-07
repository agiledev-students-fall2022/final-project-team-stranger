const mongoose = require("mongoose"); 
const db = require("./models/db.js")

const User = mongoose.model("User"); 
const Message = mongoose.model("Message"); 

// Create a user 
const harry = new User({
  username: "Harry Zhu", 
  email: "yz6790@nyu.edu", 
  passwordHash: "riptide", 
  currentMessages: [], 
  previousMessages: []
})




// create a message 
const night = new Message({
  created_by: harry._id, 
  content: "Good night!", 
  frequency: 0
})

// save a message 
night.save(err => {
  if (err) {console.log("error!", err)}
  else {console.log("Success!")}
})
harry.currentMessages.push(night._id)
// create a message 
const morning = new Message({
  created_by: harry._id, 
  content: "Good morning!", 
  frequency: 0
})

// save a message 
morning.save(err => {
  if (err) {console.log("error!", err)}
  else {console.log("Success!")}
})
harry.currentMessages.push(morning._id)
// add message to user 
// save the user to the database 
harry.save(err => {
  if (!err) {
    console.log("Success!")
  } else {
    console.log("Error!", err)
  }
})

// To get the user model from the database of the logged in user, 
// you need either their ID or their email. 
// Once you have their email, request or find the user in the DB
// Using the retrieved data, work with it as you need to do so. 
// For now, assume that the email is available from the request body 
// to find percy and populate 
