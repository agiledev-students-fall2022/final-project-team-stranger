const mongoose = require("mongoose"); 
const db = require("./models/db.js")

const User = mongoose.model("User"); 
const Message = mongoose.model("Message"); 

// Create a user 
const percy = new User({
  username: "Percy Jackson", 
  email: "percy@google.com", 
  passwordHash: "riptide", 
  currentMessages: [], 
  previousMessages: []
})

// save the user to the database 
percy.save(err => {
  if (!err) {
    console.log("Success!")
  } else {
    console.log("Error!", err)
  }
})


// // create a message 
// const newMessgae = new Message({
//   created_by: percy._id, 
//   content: "Good night!", 
//   frequency: 0
// })

// // save a message 
// newMessgae.save(err => {
//   if (err) {console.log("error!", err)}
//   else {console.log("Success!")}
// })

// add message to user 
// percy.update({
//   "$push" : {currentMessages : newMessgae._id}
// }).exec((err, data) => {
//   if (err) {console.log(err)}
//   else {
//     console.log(data); 
//   }
// })

// To get the user model from the database of the logged in user, 
// you need either their ID or their email. 
// Once you have their email, request or find the user in the DB
// Using the retrieved data, work with it as you need to do so. 
// For now, assume that the email is available from the request body 
// to find percy and populate 
// User.findOne({
//   email: "percy@google.com"
// }).populate('currentMessages')
// .exec((err, data) => {
//   if (err) {console.log(err)}
//   console.log("data: ", data)
// })

