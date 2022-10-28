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
  const url = "https://my.api.mockaroo.com/history?key=d685d830"; 

  useEffect(() => {
    async function fetchData() {
      const result = await axios(url);
      setData(result.data);
    }
    fetchData();
  }, []);


  let inf = data.length;
  return(
    <div className="historyPageWrapper">
      <Box className="historyHeader">
        <Avatar variant="circular" alt="User" sx={{bgcolor: "primary"} } className="profile"></Avatar>
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
        {data.map((item,index)=> (
          <MessageBlock key={index} text={item.text} score={item.score} time={item.time} page="history" />
        ))}
      </Box>
    </div>
    
  )
};

export default History;
