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
  if(page=="stats")
  {
    s="Shared with:"+score
  }
  else if(page=="history")
  {
    s="Received at:"+time
  }
  return (
    <div>
      <Accordion sx={{backgroundColor: "secondary" , width: "100%", border: 1}}>
        
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography sx={{ textOverflow: "ellipsis", overflow: "hidden", width: "11em"} } noWrap align="center">{text}</Typography>
          <Typography sx={{width: "40%", color: "text.secondary", textAlign:"right"}}  className="message" >{s}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            You shared this message on {time}. So far it has influenced {score} people. Thank you effort for making the world a warmer place.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  )
};

export default MessageItem; 