import "./History.css";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import MessageBlock from "./components/MessageItem.js";
import axios from "axios";
import { useState, useEffect } from "react";

const History = (props) => {
  const [data, setData] = useState([]); 
  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/history`);
      setData(result.data);
    }
    fetchData();
  }, []);


  let inf = data.length;
  return(
    <div className="historyPageWrapper">
      <Box className="historyHeader">
        <Avatar variant="circular" alt="User" className="profile"></Avatar>
        <Typography variant="h6" className="slo" align="center" paddingRight="5%">
          Kind Messages from Total Strangers!
        </Typography>
      </Box>
      <Box className="receivedMessagesDiv">
        <Typography variant="h8" className="received">Total Received Messages: {inf}</Typography>
      </Box>
      <Box textAlign="right">
        <Typography variant="h8" className="recentMessages">Recent Messages</Typography>
      </Box>
      <Box>
        {data.slice(0,15).map((item,index)=> (
          <MessageBlock key={index} text={item.text} score={item.score} time={item.time} page="history" />
        ))}
      </Box>
    </div>
    
  )
};

export default History;
