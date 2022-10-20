import "./Footer.css";
import {
  Box, Container, Grid, BottomNavigation, BottomNavigationAction
} from "@mui/material"; 
import HomeIcon from "@mui/icons-material/Home";
import SendIcon from "@mui/icons-material/Send";
import QueryStatsIcon from "@mui/icons-material/QueryStats";

// Reference link: https://mui.com/material-ui/react-bottom-navigation/

const Footer = props => {
  return <BottomNavigation
    showLabels
  >
    <BottomNavigationAction label="Home" icon={<HomeIcon/>} href="/"/>
    <BottomNavigationAction label="Send Message" icon={<SendIcon/>} href="/send-message"/>
    <BottomNavigationAction label="Stats" icon={<QueryStatsIcon/>} href="/stats"/>
  </BottomNavigation>
}

export default Footer;