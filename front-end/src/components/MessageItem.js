import "./MessageItem.css"
import * as React from "react";
import AccordionSummary from "@mui/material/AccordionSummary";
import { Accordion } from "@mui/material";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const MessageItem = (props) => {
  let {text, score, time} = props

  return (
    <div>
      <Accordion className="blo">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography sx={{width: "60%"}} >{text}</Typography>
          <Typography sx={{ color: "text.secondary" }} className="message" align="right">Shared with: {score}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            You shared this word on {time}. So far it has influenced {score} people. Thank you effort for making the world a warmer place.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <br></br>
      <br></br>
    </div>
  )
};

export default MessageItem; 