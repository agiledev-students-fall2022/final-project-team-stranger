import "./SignUp.css";
import { useState } from "react";
import { 
  Grid, Paper, TextField, Typography, FormControl, Button, Link
} from "@mui/material";
import LogoIcon from "./components/LogoIcon";
import axios from "axios"; 

const initialValues = {
  "email" : "", 
  "password" : "",
  "username" : "", 
  "confirmPassword" : "",
  "passwordError" : ""
}

const SignUp = (props) => {
  const [formValues, setFormValues] = useState(initialValues); 
  
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

  function handleSubmit(event) {
    event.preventDefault();
    console.log(formValues); 
  }

  return <Grid className="signUpPage" align="center">
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

};

export default SignUp;
