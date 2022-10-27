import "./Header.css";
import {
  AppBar, Toolbar, Button, Box, IconButton
} from "@mui/material"
import LogoIcon from "./LogoIcon";

// Reference Link: https://mui.com/material-ui/react-app-bar/#main-content

const pages = {
  "Home" : "/", 
  "Send Message" : "/send-message", 
  "Stats" : "/stats"
}; 

const Header = (props) => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <IconButton href="/" fontSize="large">
          <LogoIcon color="primary" sx={{fontSize : "3rem"}}/>
        </IconButton>
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