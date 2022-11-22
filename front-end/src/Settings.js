import "./Settings.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { 
  Grid, Paper, TextField, Typography, FormControl, Button, Link
} from "@mui/material";
import { Navigate } from "react-router-dom";

const Settings = (props) => {
  const [formValues, setFormValues] = useState({});
  const [loginStatus, setLoginStatus] = useState(undefined); 
  const jwtToken = localStorage.getItem("user_token")  
  
  // Default values - get settings for the user 
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/settings/get`, {}, {
          headers: { Authorization: `JWT ${jwtToken}`} 
        });
        setFormValues(result.data);
        setLoginStatus(true); 
      } catch(err) {
        setLoginStatus(err.response.data.success)
      }
    }
    fetchData();
  }, []);


  // On change, update the formValues 
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

  // Handle Submission 
  function handleSubmit(event) {
    event.preventDefault();

    // async function to fetch data from the backend
    async function sendRequest() {
      try {
        const result = await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/settings/update`, formValues, {
          headers: { Authorization: `JWT ${jwtToken}`} 
        });
      
        setLoginStatus(true); 
        window.location = "/"
      } catch(err) {
        setLoginStatus(err.response.data.success)
      }
    }

    sendRequest(`${process.env.REACT_APP_BACKEND_API_URL}/settings/update/`, formValues); 
  }

  const elem = <Grid className="settingsPage" align="center">
    <Paper elevation={10} className="pageWrapper">
      <Grid className="settingsPageHeader">
        <Typography variant="h4">Settings<b/></Typography>
      </Grid>

      <form onSubmit={handleSubmit} className="settingsForm">
        <FormControl className="settingsFormField">
          <Typography className="formLabel">Reset Username</Typography>
          <TextField label={formValues.username} placeholder={formValues.username} type="text" onChange={onChange} name="username"/>

          <Typography className="formLabel">Reset Email</Typography>
          <TextField label={formValues.email} placeholder={formValues.email} type="email" onChange={onChange} name="email"/>

          <Typography className="formLabel">Reset Password</Typography>
          <TextField label={formValues.password} placeholder={formValues.password} onChange={onChange} name="password" type="password"/>

          <Typography className="formLabel">Confirm Password Reset</Typography>
          <TextField label={formValues.passwordConfirm} placeholder={formValues.passwordConfirm} type="password" name="confirmPassword"
            onChange={onConfirmPasswordChange}
            error={formValues["passwordError"] !== ""}
            helperText={formValues["passwordError"]}
          /> 

          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </FormControl>
      </form>
    </Paper>
  </Grid>

  if (loginStatus === undefined) return <div>Loading...</div>
  else return loginStatus ? elem : <Navigate to="/sign-in" replace/>
};

export default Settings;
