import express from "express";
import sendRequest from "./SendRequest.js";

const settingsRouter = express.Router();
settingsRouter.post("/settings/update", (req, res) => {
    // Database Interaction Here 
    const data = req.body; 

    // Mocked Database Interaction with Mckaroo
    const result = sendRequest("https://my.api.mockaroo.com/settings-update?key=d685d830")
    res.send("Done!")
})

export default settingsRouter; 