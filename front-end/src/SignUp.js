import "./SignUp.css";
import { useState, useEffect } from "react";
import { 
  Grid, Paper, TextField, Typography, FormControl, Button, Link
} from "@mui/material";
import LogoIcon from "./components/LogoIcon";
import axios from "axios"; 
import { useNavigate, Navigate } from "react-router-dom";

const initialValues = {
  "email" : "", 
  "password" : "",
  "username" : "", 
  "confirmPassword" : "",
  "passwordError" : ""
}

const SignUp = (props) => {
  const [formValues, setFormValues] = useState(initialValues); 
  const [loginStatus, setLoginStatus] = useState(undefined); 
  const jwtToken = localStorage.getItem("user_token")  
  const navigate = useNavigate();

  useEffect(() => {
    async function getLoginStatus() {
      try {
        const result = await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/settings/get`, {}, {
          headers: { Authorization: `JWT ${jwtToken}`} 
        })
        setLoginStatus(true); 
      } catch {
        setLoginStatus(false); 
      }
    }
    getLoginStatus(); 
  }, [])
  
  const onChange = e => {
    const {name, value} = e.target; 
    setFormValues({
      ...formValues, 
      [name] : value
    }); 
  }; 

  // when confirm password field changes, make sure the passwords match
  const onConfirmPasswordChange = e => {
    const {name, value} = e.target; 
    if (formValues["password"] !== value) {
      setFormValues({
        ...formValues, 
        ["passwordError"] : "Passwords do not match!"
      }); 
    }
    else {
      setFormValues({
        ...formValues, 
        ["confirmPassword"] : value, 
        ["passwordError"] : ""
      }); 
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/signup`, formValues)
      setLoginStatus(true);
      localStorage.setItem("user_token", res.data.token)
    } catch {
      setLoginStatus(false); 
      setFormValues(initialValues); 
      window.location.reload(); 
    }
  }

  const elem = <Grid className="signUpPage" align="center">
    <Paper elevation={10} className="pageWrapper">
      <Grid className="signUpLogo">
        <LogoIcon color="primary" sx={{fontSize : "5rem"}}/>
        <Typography className="signUpHeader"><b>Welcome, Stranger!</b></Typography>
      </Grid>

      <form onSubmit={handleSubmit} className="signUpForm">
        <FormControl className="signUpFormField">
          <TextField label="Username" placeholder="John Doe" type="text" onChange={onChange} name="username" required/>
          <TextField label="Email" placeholder="hello@stranger.com" type="email" required onChange={onChange} name="email"/>
          <TextField label="Password" type="password" onChange={onChange} name="password" required/>
          <TextField label="Confirm Password" type="password" name="confirmPassword" required
            onChange={onConfirmPasswordChange}
            error={formValues["passwordError"] !== ""}
            helperText={formValues["passwordError"]}
          />
          <Button variant="contained" color="primary" type="submit">
          Submit
          </Button>
        </FormControl>
      </form>
      <Link href="/sign-in">Sign In!</Link>
    </Paper>
  </Grid>

  if (loginStatus === undefined) {return <div><p>Loading</p></div>}
  else { 
    if(loginStatus){
      alert(
        "Account Created"
      );
      navigate("/sign-in");
    } else
    {
      return elem
    }
  }
};

export default SignUp;
