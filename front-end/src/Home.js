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
  const [messages, setMessages] = useState([]);
  const [views, setViews] = useState(0);
  const [lastMessage, setLastMessage] = useState("");
  const [error, setError] = useState("");
  const [date, setDate] = useState(new Date().getDate());
  const url = "http://localhost:3000";
  //const url = "https://my.api.mockaroo.com/messages?key=d685d830";

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
        // the response has been received, so remove the loading icon
        //setLoaded(true)
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
      <br />
      <Card container className="preview" variant="outlined">
        <CardActions className="action">
          <Button className="info" size="small" color="secondary" href="/stats">
            More
          </Button>
        </CardActions>
        <CardContent className="content">
          <Typography color="primary">Highest Views Gained</Typography>
          <Typography color="secondary">{views}</Typography>
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
            More
          </Button>
        </CardActions>
        <CardContent className="content">
          <Typography color="primary">Previous Highlights </Typography>
          <Typography color="secondary">{lastMessage}</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
