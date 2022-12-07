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
import { Navigate } from "react-router-dom";


const email="yz6790@nyu.edu"
const History = (props) => {
  const [data, setData] = useState([]); 
  const [loginStatus, setLoginStatus] = useState(undefined); 
  const jwtToken = localStorage.getItem("user_token")

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/history`, {}, {
          headers: { Authorization: `JWT ${jwtToken}`} 
        });
        setLoginStatus(true); 
        setData(result.data)
      } catch(err) {
        setLoginStatus(err.response.data.success)
      }
    }
    fetchData();
  }, []);


  let inf = data.length;
  
  const elem =
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
        <MessageBlock key={index} text={item.content} score={item.frequency} time={index} page="history" />
      ))}
    </Box>
  </div>
    
  if (loginStatus === undefined) return <div>Loading...</div>
  else return loginStatus ? elem : <Navigate to="/sign-in" replace/>
};

export default History;
