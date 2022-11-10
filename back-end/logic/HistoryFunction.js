
const express=require("express")
const HistoryRouter = express.Router();
const axios=require("axios")

function downsort(propertyName) {
      return function(object1, object2) {
        var value1 = object1[propertyName];
        var value2 = object2[propertyName];
        return value2.localeCompare(value1);
      }
    }
HistoryRouter.get("/history", async (req,res) =>{
    res.header("Access-Control-Allow-Origin", "*");
    try {
        const apiResponse = await axios.get(
          "https://my.api.mockaroo.com/history?key=b402e590"
        )
        // console.log(apiResponse.data)

        let responseData=apiResponse.data
        responseData.sort(downsort("time"))

        console.log("Hello World");
        // console.log(responseData)
    
        // send the data in the response
        res.json(responseData)
      } catch (err) {
        // send an error JSON object back to the browser
        console.log(err)
        res.json(err)
      }
})

module.exports=HistoryRouter