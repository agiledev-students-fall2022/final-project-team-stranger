import "./Message.css";
import { Paper, Typography } from "@mui/material";

const Message = (props) => {
  return (
    <Paper
      className="message"
      elevation={5}
      sx={{
        borderRadius: 2,
      }}
    >
      <Typography className="item">{props.message}</Typography>
    </Paper>
  );
};

export default Message;
