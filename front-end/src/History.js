import "./History.css";
import { Link, renderMatches } from "react-router-dom";
import * as React from "react";
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

const History = (props) => {

  var data=[
    {text: "AAAA", score: 100, time: "2022-10-1"},
    {text: "BBBB", score: 50, time: "2022-9-10"}
  ]

  let inf=0;
  return(
    <div className="historyPageWrapper">
      <Box>
        <Avatar sx={{bgcolor: "primary"} } className="pro">User</Avatar>
        <Typography variant="h6" className="slo" align="center">
          Many a little makes a mickle, so is Kindness
        </Typography>
      </Box>
      <Box sx={{m: 3}} textAlign="left">
        <Typography variant="h8" className="received">Total Received Messages: {inf}</Typography>
      </Box>
      <Box textAlign="right">
        <Typography variant="h8" className="recentMessages">Recent Messages</Typography>
      </Box>
      <Box>
        {data.map((item,index)=> (
          <MessageBlock key={index} text={item.text} score={item.score} time={item.time} page="history" />
        ))}
      </Box>
    </div>
    
  )
};

export default History;
