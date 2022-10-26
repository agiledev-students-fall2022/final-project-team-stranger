import "./MessageItem.css"
import * as React from "react";
import AccordionSummary from "@mui/material/AccordionSummary";
import { Accordion, Hidden } from "@mui/material";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const MessageItem = (props) => {
  let {text, score, time} = props

  return (
    <div>
      <Accordion sx={{backgroundColor: "#fae1dd",width: "100%"}}>
        <AccordionSummary
          
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography sx={{width: "100%", textOverflow: "ellipsis"} } noWrap align="center">{text}</Typography>
          <Typography sx={{ color: "text.secondary", textAlign:"right"}} className="message" >Shared with: {score}</Typography>
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