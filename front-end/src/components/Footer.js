import "./Footer.css";
import { Link } from "react-router-dom";
import {
  Box
} from "@mui/material"; 

const Footer = props => {
  return <Box>
    <footer className="strangerFooter">
      <Link to="/" className="footerHomeLink">Home</Link> 
      &copy;HelloStranger, 2022
    </footer>
  </Box>
};

export default Footer;