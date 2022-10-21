import "./Footer.css";
import Countdown from "react-countdown-simple";
import { Paper, Typography } from "@mui/material";

const Timer = (props) => {
  //next midnight
  const refreshTime = new Date(new Date().setHours(24, 0, 0, 0)).toISOString();

  const renderer = ({ days, hours, minutes, seconds }) => (
    <Typography>
      {hours}:{minutes}:{seconds} till next messages
    </Typography>
  );

  return <Countdown targetDate={refreshTime} renderer={renderer} />;
};

export default Timer;
