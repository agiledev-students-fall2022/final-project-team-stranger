import React, { useState, useEffect } from "react";
import "./SendMessage.css";
import { useNavigate, Navigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";

const url = `${process.env.REACT_APP_BACKEND_API_URL}`;

const SendMessage = (props) => {
  const [loginStatus, setLoginStatus] = useState(undefined);
  const [message, setMessage] = useState("");
  const jwtToken = localStorage.getItem("user_token");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.post(
          `${url}/send-message/get`,
          {},
          {
            headers: { Authorization: `JWT ${jwtToken}` },
          }
        );
        setLoginStatus(true);
      } catch (err) {
        setLoginStatus(err.response.data.success);
      }
    }
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() === "") {
      alert("Message cannot be empty.");
    } else {
      axios
        // post new message to server
        .post(
          `${url}/send-message/send`,
          {
            message: message,
          },
          {
            headers: { Authorization: `JWT ${jwtToken}` },
          }
        )
        .then((response) => {
          setLoginStatus(true);
          alert(
            `Your message:\n${response.data.message}\nis successfully sent!`
          );
          navigate("/"); //redirect to home
        })
        .catch((err) => {
          if (!err.response.data.status) {
            setLoginStatus(err.response.data.success);
          } else {
            alert(err.response.data.status);
          }
        });
    }
  };

  const elem = (
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

  if (loginStatus === undefined) return <div>Loading...</div>;
  else return loginStatus ? elem : <Navigate to="/sign-in" replace />;
};

export default SendMessage;
