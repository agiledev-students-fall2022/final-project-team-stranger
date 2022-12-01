const express = require("express"); 
const protectedRouter = express.Router(); 

// Store any routes that are not part of the routers and need to be 
// protected here.


// default route to check if the user is loggedIn 
protectedRouter.post("/secret", (req, res, next) => {
  res.header.add("Access-Control-Allow-Origin", "*");
  res.header.add("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
  res.header.add("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Authorization, Origin, Accept");
  res.json({
    success: true, 
    status: "All good!"}); 
})

module.exports = protectedRouter; 