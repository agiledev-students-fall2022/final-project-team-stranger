import "./Stats.css";
import { Link, renderMatches } from "react-router-dom";
import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import { ClassNames } from "@emotion/react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MessageBlock from "./components/MessageItem.js";

const Stats = (props) => {

  var startData=[
    {text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", score: 100, time: "2022-10-1"},
    {text: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua", score: 50, time: "2022-9-10"}
  ]
  const [data, setData] = useState(startData)

  function downSort(propertyName) {
    if ((typeof data[0][propertyName]) != "number") {
      return function(object1, object2) {
        var value1 = object1[propertyName];
        var value2 = object2[propertyName];
        return value2.localeCompare(value1);
      }
    }
    else {
      return function(object1, object2) {
        var value1 = object1[propertyName];
        var value2 = object2[propertyName];
        return value2 - value1;
      }
    }
  }
  
  function handleClick (e){
    var prop = e.target.value;
    let newData = [... data]
    newData.sort(downSort(prop));
    setData(newData)
    console.log(data)
  }


  let dataList=(data.map((item,index)=>{
    return(
      <MessageBlock key={index} {...item} />
    )
  }))

  
  let inf = 0;

  
  return(
    <div>
      <Box sx={{ width: "100%" }} >
        <Avatar variant="circular" alt="User" className="profile"></Avatar>
        <Typography variant="h6" className="Slogan">Embrace Warmth <br></br>You Sent to the World</Typography>
      </Box>

      <br></br>
      <br></br>
      <Box sx={{ width: "100%" }} display="flex" justifyContent={"right"}>
       
        <FormControl className="SortChoices">
          <InputLabel id="Select" className="default_text">Sorted By</InputLabel>
          <Select label="Sorted By" onChange={(e)=>handleClick(e)} className="sort_icon" defaultValue={"score"}>
            <MenuItem value="score">Impact</MenuItem>
            <MenuItem value="text" >Text</MenuItem>
            <MenuItem value="time" >Time</MenuItem>
          </Select>
        </FormControl>
      
      </Box>
      <br></br>
      <Box textAlign="left" className="Total">
        <Typography variant="h8" className="influence">Your Total influence: {inf}</Typography>
      </Box>
      <Box>

        {data.map((item,index)=> (
          <MessageBlock key={index} text={item.text} score={item.score} time={item.time} page="stats" />
        ))}

      </Box>
    </div>
    
  )
};

export default Stats;
