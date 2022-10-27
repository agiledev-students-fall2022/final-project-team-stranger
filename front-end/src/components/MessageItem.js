import "./MessageItem.css"
import * as React from "react";
import AccordionSummary from "@mui/material/AccordionSummary";
import { Accordion, Hidden } from "@mui/material";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const MessageItem = (props) => {
  let {text, score, time, page} = props
  let s;
  if(page == "stats") {s = "Shared with " + score + " strangers!"}
  else if(page == "history") {s = "You received this message on " + time}

  return (
    <div className="messageItemWrapper">
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
          aria-controls="panel1a-content"
          id="panel1a-header">
          <Typography sx={{textOverflow: "ellipsis", overflow: "hidden", width: "11em"} } noWrap align="left">{text}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography textAlign="left">
            <ul>
              <li>{s}</li>
              <li> So far it has influenced {score} people.</li>
              <li> Thank you effort for making the world a warmer place!</li>
            </ul>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  )
};

export default MessageItem; 