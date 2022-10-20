import "./Header.css";
// import { Link } from "react-router-dom";
import {
  AppBar, Typography, Toolbar, Button, Link, Box
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu";

const pages = {
  "Home" : "/", 
  "Send Message" : "/send-message", 
  "Stats" : "/stats"
}; 

const Header = (props) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box>
          {Object.keys(pages).map(page => {
            return <Button key={page} color="inherit" href={pages[page]}>
              {page}
            </Button>
          })}
        </Box>
      </Toolbar>
    </AppBar>
  )
};

export default Header;
