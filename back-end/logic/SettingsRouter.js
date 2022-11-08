import express from "express";
import * as nt from "./SendRequest.js";

const settingsRouter = express.Router();
settingsRouter.post("/settings/update", (req, res) => {
    // Database Interaction Here 
    const data = req.body; 

    // Mocked Database Interaction with Mckaroo
    const result = nt.sendPostRequest("https://my.api.mockaroo.com/settings-update?key=d685d830")
    res.send({"msg" : "Done!"})
})

settingsRouter.post("/settings/get", (req, res) => {
    // Database Interaction here 
    const data = req.body; 

    const result = nt.sendGetRequest("https://my.api.mockaroo.com/user?key=d685d830"); 
    if (!result.data) {
        res.send({
            username: "John Smith", 
            email: "demo@gmail.com", 
            password: "",
            confirmPassword: "", 
            passwordError: ""
          })
    }
    else {
        res.send(result.data); 
    }
})

export default settingsRouter; 