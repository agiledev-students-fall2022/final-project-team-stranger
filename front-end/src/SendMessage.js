import React, { useState } from "react";
import "./SendMessage.css";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";

const SendMessage = (props) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    //test behavior
    if (message.trim() === "") {
      alert("Message cannot be empty.");
    } else {
      axios
        // post new message to server
        .post("/message/upload", {
          message: message,
        })
        .then((response) => {
          alert(
            `Your message:\n${response.data.message}\nis successfully sent!`
          );
          navigate("/"); //redirect to home
        })
        .catch((err) => {
          setError(`error:${err}`);
        });
      setMessage("");
    }
  };

  return (
    <>
      <Grid2 container className="contain">
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
              helperText={
                message.trim() === "" ? "Message cannot be empty" : " "
              }
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

export default SendMessage;
