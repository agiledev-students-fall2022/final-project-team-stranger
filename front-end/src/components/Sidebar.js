import React, { useState } from "react";
import "./Sidebar.css";
import {
  Avatar,
  Box,
  IconButton,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import axios from "axios";
import {useEffect } from "react";



const Sidebar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("Username");
  const [joinTime, setJoinTime] = useState("XX");
  const [loginStatus, setLoginStatus] = useState(undefined); 
  const jwtToken = localStorage.getItem("user_token")
  

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/sidebar`, {}, {
          headers: { Authorization: `JWT ${jwtToken}`} 
        });
        setName(result.data["username"])
        setJoinTime(result.data["joinTime"])
        setLoginStatus(true);

      } catch(err) {
        setLoginStatus(err.response.data.success)
      }
    }
    fetchData();
  }, []);
  
  const toggleDrawer = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };
  const elemLogin=
    <>
      <IconButton>
        <AccountCircleIcon onClick={toggleDrawer} className="circleIcon"/>
      </IconButton>
      <SwipeableDrawer id="menu" open={isOpen} onClose={toggleDrawer}>
        <Box id="profile">
          <Avatar>U</Avatar>
          <br />
          <div>USERNAME</div>
          <div>JOINED XX DAYS AGO</div>
        </Box>

        <List className="actions">
          <ListItem disablePadding>
            <ListItemButton id="sign-in" className="menu-item" href="/sign-in">
              <ListItemIcon>
                <LoginIcon className="logOut"/>
              </ListItemIcon>
              <ListItemText primary="Sign out" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              id="settings"
              className="menu-item"
              href="/settings"
            >
              <ListItemIcon>
                <SettingsIcon className="settingIcon"/>
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
        </List>
      </SwipeableDrawer>
    </>
  const elemLogout=
  <>
    <IconButton>
      <AccountCircleIcon onClick={toggleDrawer} className="circleIcon"/>
    </IconButton>
    <SwipeableDrawer id="menu" open={isOpen} onClose={toggleDrawer}>
      <Box id="profile">
        <Avatar>{name.substring(0,1).toUpperCase()}</Avatar>
        <br />
        <div>{name}</div>
        <div>JOINED {joinTime} DAYS AGO</div>
      </Box>

      <List className="actions">
        <ListItem disablePadding>
          <ListItemButton id="sign-in" className="menu-item" href="/sign-in">
            <ListItemIcon>
              <LogoutIcon className="logOut"/>
            </ListItemIcon>
            <ListItemText primary="Sign out" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            id="settings"
            className="menu-item"
            href="/settings"
          >
            <ListItemIcon>
              <SettingsIcon className="settingIcon"/>
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>
      </List>
    </SwipeableDrawer>
  </>
  if (loginStatus === undefined) return <div>Loading...</div>
  else return loginStatus ? elemLogout :elemLogin
};

export default Sidebar;
