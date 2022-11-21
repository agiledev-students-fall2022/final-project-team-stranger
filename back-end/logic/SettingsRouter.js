const express = require("express");
const nt = require("./SendRequest.js"); 

const settingsRouter = express.Router();
settingsRouter.post("/settings/update", (req, res) => {
    // Database Interaction Here 
    const data = req.body; 
    console.log(req.user)

    // Mocked Database Interaction with Mckaroo
    const result = nt.makePostRequest("https://my.api.mockaroo.com/settings-update?key=d685d830")
    res.status(200).send({"msg" : "Done!"})
})

settingsRouter.post("/settings/get", (req, res) => {
    // Database Interaction here 
    const data = req.body; 

    // Mocked Database Interaction 
    const result = nt.makeGetRequest("https://my.api.mockaroo.com/user?key=d685d830"); 

    // If we exceed the 200 daily request limit, send back some sample data
    if (!result.data) {
        res.status(200).send({
            username: "John Smith", 
            email: "demo@gmail.com", 
            password: "",
            confirmPassword: "", 
            passwordError: ""
          })
    }
    // Else, send back the real data 
    else {
        res.status(200).send(result.data); 
    }
})

module.exports = settingsRouter; 