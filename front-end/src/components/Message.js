import * as React from "react";
import "./Message.css";
import { Paper, TextField, Button } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import SendIcon from "@mui/icons-material/Send";

const Message = (props) => {
  return (
    <>
      <Grid2 container sx={{ m: "0px 15px" }}>
        <Grid2 item xs={5} sm={4}>
          <h3>New Message</h3>
        </Grid2>
        <Grid2 item xs={12}>
          <Paper variant="">
            <TextField
              id="newMessage"
              margin="normal"
              variant="outlined"
              label="Share your warmth with strangers"
              fullWidth
              multiline
              rows={12}
            />
            <Grid2 item xs={4} xsOffset={8} smOffset={9}>
              <Button variant="contained" endIcon={<SendIcon />} size="large">
                Send
              </Button>
            </Grid2>
          </Paper>
        </Grid2>
      </Grid2>
    </>
  );
};

export default Message;
