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

const Home = (props) => {
  const [messages, setMessages] = useState([
    "Fetching warmth...",
    "Fetching warmth...",
    "Fetching warmth...",
  ]);
  const [views, setViews] = useState(0);
  const [lastMessage, setLastMessage] = useState();
  const [error, setError] = useState("");
  const [date, setDate] = useState(new Date().getDate());
  const url = `${process.env.REACT_APP_BACKEND_API_URL}`;

  const fetchMessages = () => {
    axios
      .get(`${url}/messages`)
      .then((response) => {
        // axios bundles up all response data in response.data property
        const messages = response.data.messages;
        setMessages(messages);
      })
      .catch((err) => {
        setError(err);
        console.error(error);
      })
      .finally(() => {
        // the response has been received, so remove the loading icon
        //setLoaded(true)
        console.log("Content successfully loaded.");
      });
  };

  const fetchSummary = () => {
    axios
      .get(`${url}/summary`)
      .then((response) => {
        // axios bundles up all response data in response.data property
        setViews(response.data.view);
        setLastMessage(response.data.lastMessage);
      })
      .catch((err) => {
        setError(err);
        console.error(error);
      })
      .finally(() => {
        console.log("Content successfully loaded.");
      });
  };

  useEffect(() => {
    fetchMessages();
    fetchSummary();
    //update when date changes
    let currentDate;
    if ((currentDate = new Date().getDate()) != date) {
      fetchMessages();
      setDate(currentDate);
    }
  }, []);

  return (
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
          <Typography color="primary.dark">Your total influence</Typography>
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
};

export default Home;
