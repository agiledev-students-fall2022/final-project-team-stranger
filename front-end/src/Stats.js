import "./Stats.css";
import Avatar from "@mui/material/Avatar";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MessageBlock from "./components/MessageItem.js";
import axios from "axios";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const Stats = (props) => {
  const [data, setData] = useState([]);
  const [inf, setInf] = useState([]);
  const [loginStatus, setLoginStatus] = useState(undefined);
  const jwtToken = localStorage.getItem("user_token");

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.post(
          `${process.env.REACT_APP_BACKEND_API_URL}/stats`,
          {},
          {
            headers: { Authorization: `JWT ${jwtToken}` },
          }
        );
        setLoginStatus(true);
        setData(result.data);
      } catch (err) {
        setLoginStatus(err.response.data.success);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchSummary() {
      try {
        const result = await axios.post(
          `${process.env.REACT_APP_BACKEND_API_URL}/summary`,
          {},
          {
            headers: { Authorization: `JWT ${jwtToken}` },
          }
        );
        setLoginStatus(true);
        setInf(result.data);
      } catch (err) {
        setLoginStatus(err.response.data.success);
      }
    }
    fetchSummary();
  }, []);

  function downSort(propertyName) {
    if (typeof data[0][propertyName] != "number") {
      return function (object1, object2) {
        var value1 = object1[propertyName];
        var value2 = object2[propertyName];
        return value2.localeCompare(value1);
      };
    } else {
      return function (object1, object2) {
        var value1 = object1[propertyName];
        var value2 = object2[propertyName];
        return value2 - value1;
      };
    }
  }

  function handleClick(e) {
    var prop = e.target.value;
    let newData = [...data];
    newData.sort(downSort(prop));
    setData(newData);
  }

  const elem = (
    <div>
      <Box className="container">
        <Avatar variant="circular" alt="User" className="profile"></Avatar>
        <Typography variant="h6" className="Slogan">
          Embrace Warmth <br></br>You Sent to the World
        </Typography>
      </Box>

      <br></br>
      <br></br>
      <Box className="container" display="flex" justifyContent={"right"}>
        <FormControl className="SortChoices">
          <InputLabel id="Select" className="default_text">
            Sorted By
          </InputLabel>
          <Select
            label="Sorted By"
            onChange={(e) => handleClick(e)}
            className="sort_icon"
            defaultValue={"frequency"}
          >
            <MenuItem value="frequency">Impact</MenuItem>
            <MenuItem value="content">Text</MenuItem>
            <MenuItem value="createdAt">Time</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <br></br>
      <Box textAlign="left" className="Total">
        <Typography variant="h8" className="influence">
          Your Total influence: {inf}
        </Typography>
      </Box>
      <Box>
        {data.map((item, index) => (
          <MessageBlock
            key={index}
            text={item.content}
            score={item.frequency}
            time={item.createdAt}
            page="stats"
          />
        ))}
      </Box>
    </div>
  );

  if (loginStatus === undefined) return <div>Loading...</div>;
  else return loginStatus ? elem : <Navigate to="/sign-in" replace />;
};

export default Stats;
