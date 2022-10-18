import React, { useState } from "react";
import "./Message.css";
import { useNavigate } from "react-router-dom";
import { Paper, TextField, Button } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import SendIcon from "@mui/icons-material/Send";

const Message = (props) => {
  const [message, setMessage] = useState("");
  //const [err, setErr] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    //test behavior
    if (message === "") {
      alert("Message cannot be empty.");
    } else {
      alert(`Your message:\n${message}\nis successfully sent!`);
      navigate("/"); //redirect to home
    }
  };

  return (
    <>
      <Grid2 container sx={{ m: "0px 15px" }}>
        <Grid2 item xs={5} sm={4}>
          <h3>New Message</h3>
        </Grid2>
        <Grid2 item xs={12}>
          <form onSubmit={handleSubmit}>
            <TextField
              value={message}
              margin="normal"
              variant="outlined"
              label="Share your warmth with strangers"
              fullWidth
              multiline
              rows={12}
              onChange={(e) => setMessage(e.target.value)}
              helperText={message === "" ? "Message cannot be empty" : " "}
            />
            <Grid2 item xs={4} xsOffset={8} smOffset={9}>
              <Button
                type="submit"
                variant="contained"
                endIcon={<SendIcon />}
                size="large"
              >
                Send
              </Button>
            </Grid2>
          </form>
        </Grid2>
      </Grid2>
    </>
  );
};

export default Message;
