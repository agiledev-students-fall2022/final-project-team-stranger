import "./Header.css";
import {
  AppBar, Toolbar, Button, Box
} from "@mui/material"

// Reference Link: https://mui.com/material-ui/react-app-bar/#main-content

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