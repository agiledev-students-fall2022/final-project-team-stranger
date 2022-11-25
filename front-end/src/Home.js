import "./Home.css";
import Timer from "./components/Timer";
import Message from "./components/Message";
import Carousel from "react-material-ui-carousel";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
const url = `${process.env.REACT_APP_BACKEND_API_URL}`;

const Home = (props) => {
  const [loginStatus, setLoginStatus] = useState(undefined);
  const jwtToken = localStorage.getItem("user_token");
  const [messages, setMessages] = useState([
    "Fetching warmth...",
    "Fetching warmth...",
    "Fetching warmth...",
  ]);
  const [views, setViews] = useState(0);
  const [lastMessage, setLastMessage] = useState();
  const [date, setDate] = useState(new Date().getDate());

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.post(
          `${url}/messages`,
          {},
          {
            headers: { Authorization: `JWT ${jwtToken}` },
          }
        );
        setMessages(result.data.messages);
        setViews(result.data.view);
        setLastMessage(result.data.lastMessage);
        setLoginStatus(true);
      } catch (err) {
        setLoginStatus(err.response.data.success);
      }
    }
    fetchData();
    // refreshment only available when the user refreshes the page
  }, []);

  const elem = (
    <div>
      <Typography variant="h4" color="primary" id="welcome">
        Welcome Home!
      </Typography>
      <Carousel
        swipe="true"
        navButtonsAlwaysVisible="true"
        cycleNavigation="true"
      >
        {messages.map((msg, i) => (
          <Message key={i} message={msg} />
        ))}
      </Carousel>
      <Timer currentDate={date} />
      <br />
      <Card container className="preview" variant="outlined">
        <CardActions className="action">
          <Button className="info" size="small" color="secondary" href="/stats">
            More Stats
          </Button>
        </CardActions>
        <CardContent className="content">
          <Typography color="primary.dark">Your Total Influence</Typography>
          <Typography color="primary.light">{views}</Typography>
        </CardContent>
      </Card>
      <Card className="preview" variant="outlined">
        <CardActions className="action">
          <Button
            className="info"
            size="small"
            color="secondary"
            href="/history"
          >
            More History
          </Button>
        </CardActions>
        <CardContent className="content">
          <Typography color="primary.dark">Previous Highlights </Typography>
          <Typography noWrap color="primary.light" className="LastMessage">
            {lastMessage}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );

  if (loginStatus === undefined) return <div>Loading...</div>;
  else return loginStatus ? elem : <Navigate to="/sign-in" replace />;
};

export default Home;
