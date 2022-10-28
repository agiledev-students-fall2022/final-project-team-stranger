import "./Footer.css";
import {
  BottomNavigation, BottomNavigationAction, Paper
} from "@mui/material"; 
import HomeIcon from "@mui/icons-material/Home";
import SendIcon from "@mui/icons-material/Send";
import QueryStatsIcon from "@mui/icons-material/QueryStats";

const Footer = props => {
  return <Paper elevation={3} className="paper">
    <BottomNavigation showLabels>
      <BottomNavigationAction label="Home" icon={<HomeIcon/>} href="/"/>
      <BottomNavigationAction label="Send Message" icon={<SendIcon/>} href="/send-message"/>
      <BottomNavigationAction label="Stats" icon={<QueryStatsIcon/>} href="/stats"/>
    </BottomNavigation>
  </Paper>
}

export default Footer;