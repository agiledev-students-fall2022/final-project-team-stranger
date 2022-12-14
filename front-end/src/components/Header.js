import "./Header.css";
import { AppBar, Toolbar, Button, Box, IconButton } from "@mui/material";
import LogoIcon from "./LogoIcon";
import Sidebar from "./Sidebar";
// Reference Link: https://mui.com/material-ui/react-app-bar/#main-content

const pages = {
  Home: "/",
  Send: "/send-message",
  Stats: "/stats",
};

const Header = (props) => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Sidebar />
        <IconButton href="/" fontSize="large">
          <LogoIcon color="primary"  className="logo" />
        </IconButton>
        <Box id="box">
          {Object.keys(pages).map((page) => {
            return (
              <Button
                key={page}
                color="inherit"
                href={pages[page]}
                className="links"
              >
                {page}
              </Button>
            );
          })}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
