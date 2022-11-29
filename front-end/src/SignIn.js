import "./SignIn.css";
import { 
  Grid, Paper, TextField, Typography, FormControl, Button, Link
} from "@mui/material";
import { useState } from "react";
import LogoIcon from "./components/LogoIcon";
import axios from "axios"; 

const initialValues = {
  "email" : "", 
  "password" : ""
}

const SignIn = (props) => {
  localStorage.removeItem("user_token")
  const [formValues, setFormValues] = useState(initialValues);
  const onChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      
      const res = await (await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/login`, formValues)).data
      if (!res.success) {
        alert(res.message)
        setFormValues(initialValues)
      } else {
        localStorage.setItem("user_token", res.token)
        window.location = "/"
      }
    } catch(err) {
      alert("Incorrect Credentials!")
      setFormValues(initialValues);
      window.location.reload(false); 
    }
  }
  
  return <Grid className="signInPage" align="center">
    <Paper elevation={10} className="pageWrapper">
      <Grid className="signInLogo">
        <LogoIcon color="primary"  className="logoIcon"/>
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
