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

//Test Messages
//Maybe limit input length <=250 characters
let messages = [
  "When my heart feels lonely, your spirit swiftly bonds me with love. You are my world.When my heart feels lonely, your spirit swiftly bonds me with love. You are my world.When my heart feels lonely, your spirit swiftly bonds me with love. You are my world.",
  "Anytime I think of how much I have lost out, I smile because I've not lost out in finding that one Jewel so priceless and virtuous. You fill my world with blessings sweetheart.",
  "I'll hug you all day if I could...",
];

const Home = (props) => {
  return (
    <div>
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
          <Typography color="primary">Total Views Gained: </Typography>
          <Typography color="secondary">{props.views}</Typography>
        </CardContent>
      </Card>
      <Card className="preview" variant="outlined">
        <CardActions className="action">
          <Button
            className="info"
            size="small"
            color="secondary"
            href="/message-history"
          >
            More
          </Button>
        </CardActions>
        <CardContent className="content">
          <Typography color="primary">Previous Highlight: </Typography>
          <Typography color="secondary">{props.lastMessage}</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
