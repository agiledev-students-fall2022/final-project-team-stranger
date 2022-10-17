import React from "react";
import "./SendMessage.css";
import { Link } from "react-router-dom";
import Message from "./components/Message";

const SendMessage = (props) => {
  return (
    <div>
      <Message />
    </div>
  );
};

export default SendMessage;
