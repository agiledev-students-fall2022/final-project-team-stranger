import "./Timer.css";
import Countdown from "react-countdown-simple";
import { Typography } from "@mui/material";

const Timer = ({ currentDate }) => {
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
