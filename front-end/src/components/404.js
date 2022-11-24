import "./404.css"; 
import { Typography, Box } from "@mui/material";

const ERROR_404 = (props) => {
  return <Box className="pageWrapper">
    <Typography variant="h3" sx={{marginBottom: "2%"}}>
        Oops! <br/>
    </Typography>
    <Typography variant="h5">
      {"It doesn't look like theres a page here. Return to home?"}
    </Typography>
  </Box>
}

export default ERROR_404; 