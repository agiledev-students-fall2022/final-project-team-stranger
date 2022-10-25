import { SvgIcon } from "@mui/material";
import {ReactComponent as HelloStrangerLogo} from "../assets/logos/svg/logo-no-background.svg"
import "./LogoIcon.css"

const LogoIcon = props => {
  return <SvgIcon 
    {...props}
    component={HelloStrangerLogo} inheritViewBox/>
}

export default LogoIcon; 