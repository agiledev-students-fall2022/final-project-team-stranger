import "./SignIn.css";
import { 
  Grid, Paper, TextField, Typography, FormControl, Button, Link
} from "@mui/material";
import { useState } from "react";
import LogoIcon from "./components/LogoIcon";

const initialValues = {
  "email" : "", 
  "password" : ""
}

const SignIn = (props) => {
  const [formValues, setFormValues] = useState(initialValues);
  const onChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  function handleSubmit(event) {
    event.preventDefault();
    console.log(formValues); 
  }
  
  return <Grid className="signInPage" align="center">
    <Paper elevation={10} className="pageWrapper">
      <Grid className="signInLogo">
        <LogoIcon color="primary" sx={{fontSize : "5rem"}}/>
        <Typography className="signInHeader"><b>Hello, Stranger! <br/> Sign In?</b></Typography>
      </Grid>

      <form onSubmit={handleSubmit} className="signInForm">
        <FormControl className="signInFormField">
          <TextField label="Email" placeholder="hello@stranger.com" type="email" required onChange={onChange} name="email"/>
          <TextField label="Password" type="password" required onChange={onChange} name="password"/>
          <Button variant="contained" color="primary" type="submit">
          Submit
          </Button>
        </FormControl>
      </form>
      <Link href="/sign-up">Sign Up!</Link>
    </Paper>
  </Grid>
};

export default SignIn;
