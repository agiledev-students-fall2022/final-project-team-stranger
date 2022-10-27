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

const Sidebar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };
  return (
    <>
      <IconButton>
        <AccountCircleIcon onClick={toggleDrawer} />
      </IconButton>
      <SwipeableDrawer id="menu" open={isOpen} onClose={toggleDrawer}>
        <Box id="profile">
          <Avatar>U</Avatar>
          <br />
          <div>USERNAME</div>
          <div>JOINED 99 DAYS AGO</div>
        </Box>

        <List className="actions">
          <ListItem disablePadding>
            <ListItemButton id="sign-in" className="menu-item" href="/sign-in">
              <ListItemIcon>
                <LogoutIcon />
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
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
        </List>
      </SwipeableDrawer>
    </>
  );
};

export default Sidebar;
