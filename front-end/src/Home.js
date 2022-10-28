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
  const url = "https://my.api.mockaroo.com/messages?key=d685d830";

  useEffect(() => {
    async function fetchData() {
      const result = await axios(url);
      setMessages(result.data);
    }
    fetchData();
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
      <Timer />
      <br />
      <br />
      <br />
      <Card container className="preview" variant="outlined">
        <CardActions className="action">
          <Button className="info" size="small" color="secondary" href="/stats">
            More
          </Button>
        </CardActions>
        <CardContent className="content">
          <Typography color="primary">Total Views Gained</Typography>
          <Typography color="secondary">{props.views}</Typography>
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
          <Typography color="secondary">{props.lastMessage}</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
