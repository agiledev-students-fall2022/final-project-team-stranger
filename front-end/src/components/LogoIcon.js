import { SvgIcon } from "@mui/material";
import {ReactComponent as HelloStrangerLogo} from "../assets/logos/svg/logo-no-background.svg"
import "./LogoIcon.css"

const LogoIcon = props => {
  if (props.color == "black" ) {
    return <SvgIcon 
      {...props}
      component={HelloStrangerLogo} inheritViewBox/>
  }

  // TODO: return the white version of the logo, no background 
  // Need to create teh SVG 
  return <SvgIcon 
    {...props}
    component={HelloStrangerLogo} inheritViewBox/>
}

export default LogoIcon; 